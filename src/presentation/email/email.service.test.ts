import { EmailService, SendEmailOptions } from "./email.service"
import nodemailer from 'nodemailer'

describe('email service', () => {

	const mockSendEmail = jest.fn();
	nodemailer.createTransport = jest.fn().mockReturnValue({
		sendMail: mockSendEmail
	})

	const emailService = new EmailService();

	test('Should send email', async() => {

		const options: SendEmailOptions = {
			to: 'daro.qp@gmail.com',
			subject: 'test',
			htmlBody: '<h1>Test</h1>'
		}

		await emailService.sendEmail(options)

		expect(mockSendEmail).toHaveBeenCalledWith({
			attachments: expect.any(Array),
			html: '<h1>Test</h1>',
			subject: 'test',
			to: 'daro.qp@gmail.com'
		})
	});

	test('Should send email with attachments', async() => {

		const email = 'daro.qp@gmail.com'
		await emailService.sendEmailWithFileSystemLogs(email);

		expect(mockSendEmail).toHaveBeenCalledWith({
			to: email,
			subject: 'Logs del servidor',
			html: expect.any(String),
			attachments: expect.arrayContaining([
				{filename: 'logs-all.log', path: './logs/logs-all.log'},
				{filename: 'logs-high.log', path: './logs/logs-high.log'},
				{filename: 'logs-medium.log', path: './logs/logs-medium.log'},
			])
		})
	})
})
