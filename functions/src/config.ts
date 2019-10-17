import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

interface IEnv {
	location: string;
	mailjetPublicKey: string;
	mailjetSecretKey: string;
	mailjetDefaultSender: string;
	mailjetTemplateId: string;
	mailjetSenderName: string;
}

export default {
	location: process.env.LOCATION,
	mailjetPublicKey: process.env.MAILJET_PUBLIC_KEY,
	mailjetSecretKey: process.env.MAILJET_SECRET_KEY,
	mailjetDefaultSender: process.env.MAILJET_DEFAULT_SENDER,
	mailjetTemplateId: process.env.MAILJET_TEMPLATE_ID,
	mailjetSenderName: process.env.MAILJET_SENDER_NAME
} as IEnv;
