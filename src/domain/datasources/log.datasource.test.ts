import { LogEntity, LogSeverityLevel } from "../entities/log.entity"
import { LogDatasource } from "./log.datasource"

describe('Log Datasource ', () => {

	const newLog = new LogEntity({
		origin: 'log.datasource.test.ts',
		message: 'test-message',
		level: LogSeverityLevel.low,
	})

	class MockLogDatasource implements LogDatasource {

        async saveLog(log: LogEntity): Promise<void> {
			return;
        }

        async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
			return [newLog]
        }
	}

	test('Should test the abstract class', async() => {
		const mockLogDatasource = new MockLogDatasource();

		expect(mockLogDatasource).toBeInstanceOf( MockLogDatasource );
		expect(typeof mockLogDatasource.getLog).toBe('function')
		expect(typeof mockLogDatasource.saveLog).toBe('function')

		await mockLogDatasource.saveLog(newLog);
		const logs = await mockLogDatasource.getLog(LogSeverityLevel.high);
		expect(logs).toHaveLength(1);
		expect(logs[0]).toBeInstanceOf(LogEntity);
	})
})
