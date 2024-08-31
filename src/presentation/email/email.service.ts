import nodemailer from 'nodemailer';
import { envs } from '../../config/adapters/envs.adapter';

interface SendEmailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachements?: Attachement[];
}

interface Attachement {
	filename: string;
	path: string;
}

export class EmailService {

	private transporter = nodemailer.createTransport({
		service: envs.MAILER_SERVICE,
		auth: {
			user: envs.MAILER_EMAIL,
			pass: envs.MAILER_SECRET_KEY,
		}
	});

	constructor(){}

	async sendEmail(options: SendEmailOptions): Promise<boolean> {
		
		const { to, subject, htmlBody, attachements = [] } = options;

		try {
			
			const sentInformation = await this.transporter.sendMail({
				to: to,
				subject: subject,
				html: htmlBody,
				attachments: attachements,
			});

			// console.log(sentInformation)

			return true;
		} catch (error) {

			return false;
		}
	}

	async sendEmailWithFileSystemLogs(to: string | string[]) {
		
		const subject = 'Logs del servidor';
		const htmlBody = `
				<h3>Log del sistema - NOC </h3>
				<p>Cosas que no vienen al caso</p>
				<p>Ver logs adjuntos</p>
		`;

		const attachements: Attachement[] = [
			{filename: 'logs-all.log', path: './logs/logs-all.log'},
			{filename: 'logs-high.log', path: './logs/logs-high.log'},
			{filename: 'logs-medium.log', path: './logs/logs-medium.log'},
		]

		return this.sendEmail({
			to, subject, htmlBody, attachements,
		})
	}
}
