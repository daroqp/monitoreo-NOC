import mongoose from "mongoose"
import { envs } from "../../config/adapters/envs.adapter"
import { LogModel, MongoDatabase } from "../../data/mongodb"
import { MongoLogDatasource } from "./mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

describe('Mongo log datasource', () => {

	const logDatasource = new MongoLogDatasource();

	const log = new LogEntity({
		level: LogSeverityLevel.medium,
		message: 'test message',
		origin: 'mongo-log.datasource.test.ts',
	});

	beforeAll(async() => {
		await MongoDatabase.connect({
			dbName: envs.MONGO_DB_NAME,
			mongoURL: envs.MONGO_URL,
		})
	})

	afterEach(async() => {
		await LogModel.deleteMany();
	})

	afterAll(() => {
		mongoose.connection.close();
	})

	test('Should create a log', async() => {

		const logSpy = jest.spyOn(console, 'log');


		await logDatasource.saveLog(log)

		expect(logSpy).toHaveBeenCalled();
		expect(logSpy).toHaveBeenCalledWith('Mongo log created: ', expect.any(String));
	});

	test('Should get Logs', async() => {
		await logDatasource.saveLog(log)
		const logs = await logDatasource.getLog(LogSeverityLevel.medium);

		expect(logs.length).toBe(1);
		expect(logs[0].level).toBe(LogSeverityLevel.medium)
	})
})
