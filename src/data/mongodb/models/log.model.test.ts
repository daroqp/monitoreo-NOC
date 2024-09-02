import mongoose from "mongoose"
import { envs } from "../../../config/adapters/envs.adapter"
import { MongoDatabase } from "../init"
import { LogModel } from "./log.model"

describe('Log Model Mongo', () => {

	beforeAll(async() => {
		await MongoDatabase.connect({
			mongoURL: envs.MONGO_URL,
			dbName: envs.MONGO_DB_NAME,
		})
	})

	afterAll(() => {
		mongoose.connection.close();
	})

	test('Should return log model', async() => {
		const logData = {
			origin: 'log.model.test.ts',
			message: 'test-message',
			level: 'low'
		}

		const log = await LogModel.create(logData);

		expect(log).toEqual(expect.objectContaining({
			...logData,
			createdAt: expect.any(Date),
			id: expect.any(String),
		}));

		await LogModel.findByIdAndDelete(log.id);
	})

	test('Should return the schema object', () => {

		const schema = LogModel.schema.obj;

		expect(schema).toEqual(expect.objectContaining({
			level: {
				type: expect.any(Function),
				enum: [ 'low', 'medium', 'high' ],
				default: 'low'
			},
			message: { type: expect.any(Function), required: true },
			origin: { type: expect.any(Function) },
			createdAt: expect.any(Object),
		}));
	})
})
