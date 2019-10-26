import * as functions from 'firebase-functions';

interface IEnv {
	mailjetPublicKey: string;
	mailjetSecretKey: string;
	mailjetDefaultSender: string;
	mailjetTemplateId: string;
	mailjetSenderName: string;
}

export default {
	mailjetPublicKey: functions.config().mailjet.public_key,
	mailjetSecretKey: functions.config().mailjet.secret_key,
	mailjetDefaultSender: functions.config().mailjet.default_sender,
	mailjetTemplateId: functions.config().mailjet.template_id,
	mailjetSenderName: functions.config().mailjet.sender_name
} as IEnv;
