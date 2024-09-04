import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('Log entity', () => {

	const dataObj = {
		message: 'Hola mundo',
		level: LogSeverityLevel.high,
		origin: 'log.entity.test.ts'
	}

	test('Should create a LogEntity instance', () => {
		const log = new LogEntity(dataObj);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe(dataObj.message);
		expect(log.level).toBe(dataObj.level);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test('Should create a LogEntity instance from json', () => {
		const json = `{"message":"Service http://google.com.ar working.","level":"low","createdAt":"2024-09-01T03:15:30.102Z","origin":"check-service.ts"}`;

		const log = LogEntity.fromJson(json);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe('Service http://google.com.ar working.');
		expect(log.level).toBe(LogSeverityLevel.low);
		expect(log.origin).toBe('check-service.ts');
		expect(log.createdAt).toBeInstanceOf(Date);
	});

	test('Should create LogEntity instance from object', () => {

		const log = LogEntity.fromObject(dataObj);

		expect(log).toBeInstanceOf(LogEntity);
		expect(log.message).toBe(dataObj.message);
		expect(log.level).toBe(dataObj.level);
		expect(log.origin).toBe(dataObj.origin);
		expect(log.createdAt).toBeInstanceOf(Date);
	})
});
