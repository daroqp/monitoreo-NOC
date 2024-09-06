import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe('send email log', () => {

	const mockEmailService = {
		sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
	}

	const mockLogRepository: LogRepository = {
		saveLog: jest.fn(),
		getLog: jest.fn(),
	}

	const sendEmailLogs = new SendEmailLogs(
		mockEmailService as any,
		mockLogRepository,
	);

	beforeEach(() => {
		jest.clearAllMocks();
	})

	test('Should call sendEmail and saveLog', async() => {

		const result = await sendEmailLogs.execute('daro.qp@gmail.com');

		expect(result).toBe(true);
		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		// expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
		// 	createdAt: expect.any(Date),
		// 	level: "low",
		// 	message: "Log Email sent",
		// 	origin: "send-email-log.ts",
		// })
	});

	test('Should log in case of error', async() => {

		mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

		const result = await sendEmailLogs.execute('daro.qp@gmail.com');

		expect(result).toBe(false);
		expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
		expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
		// expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
		// 	createdAt: expect.any(Date),
		// 	level: "high",
		// 	message: "Error: Email log not sent",
		// 	origin: "send-email-log.ts",
		// })
	})
})
