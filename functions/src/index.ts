import config from './config';
import * as functions from 'firebase-functions';
import * as mailjet from 'node-mailjet';

let jet: mailjet.Email.Client;
try {
	jet = mailjet.connect(config.mailjetPublicKey, config.mailjetSecretKey);
} catch (error) {
	console.error('failed to initialize mailjet due to: ', error);
}

export const sendMail = functions.auth.user().onCreate(async user => {
	try {
		if (!user.email) {
			throw new Error('user does not have an email');
		}
		const response: mailjet.Email.Response = await callMailjet(
			parseInt(config.mailjetTemplateId),
			user.email,
			user.displayName || ''
		);
		const { Messages } = response.body as any;
		if (Messages[0]) {
			console.info('Mail delivery status: ', Messages[0].Status);
		}
	} catch (error) {
		console.error('failed to send mail due to', error);
	}
});

const callMailjet = async (
	templateId: number,
	recipient: string,
	recipientName: string
) => {
	const payload = {
		Messages: [
			{
				From: {
					Email: config.mailjetDefaultSender,
					Name: config.mailjetSenderName
				},
				To: [
					{
						Email: recipient,
						Name: recipientName
					}
				],
				TemplateID: templateId,
				TemplateLanguage: true,
				Variables: {
					recipientName: recipientName ? recipientName : null
				}
			}
		]
	};
	return jet.post('send', { version: 'v3.1' }).request(payload);
};
