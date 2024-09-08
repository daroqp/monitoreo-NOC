import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('Log repository impl', () => {

	const mockLogDatasource = {
		saveLog: jest.fn(),
		getLog: jest.fn(),
	}

	const logDataImpl = new LogRepositoryImpl(mockLogDatasource);

	beforeEach(() => {
		jest.clearAllMocks()
	})

	test('saveLog should call the datasource with arguments', async() => {

		const log = new LogEntity({
			message: 'test message',
			level: LogSeverityLevel.low,
			origin: 'log.repository.impl.test.ts'
		})

		await logDataImpl.saveLog(log);

		expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
	});

	test('getLogs should call the datasource with arguments', async() => {

		const lowSeverity = LogSeverityLevel.low;
		await logDataImpl.getLog(lowSeverity);

		expect(mockLogDatasource.getLog).toHaveBeenCalledWith(lowSeverity);
	})
})
