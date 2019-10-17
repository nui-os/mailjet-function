import config from './config';
import * as functions from 'firebase-functions';
import * as mailjet from 'node-mailjet';

console.log(`reloaded ${config.location} environment`);
let jet: mailjet.Email.Client;
try {
	jet = mailjet.connect(config.mailjetPublicKey, config.mailjetSecretKey);
} catch (error) {
	console.error('failed to initialize: ', error);
}

/* 
    TODO: Add Authentication Middleware
    https://firebase.google.com/docs/functions/
    https://firebase.google.com/docs/functions/typescript
*/
export const sendMail = functions.https.onRequest(async (request, response) => {
	if (
		!request.body ||
		!request.body.recipient ||
		!request.body.recipientName
	) {
		response.send('missing parameter');
	} else {
		try {
			const result = await callMailjet(
				parseInt(config.mailjetTemplateId),
				request.body.recipient,
				request.body.recipientName
			);
			console.log('good!', result);
			response.send('Hello from Firebase!');
		} catch (error) {
			console.error('failed to send mail', error);
			response.send('ouups');
		}
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
					A: 'false',
					B: 'true'
				}
			}
		]
	};
	try {
		const results: mailjet.Email.Response = await jet
			.post('send', { version: 'v3.1' })
			.request(payload);
		return Promise.resolve(results);
	} catch (error) {
		return Promise.reject(error);
	}
};
