import mongoose from "mongoose"
import { MongoDatabase } from "./init"

describe('Init mongodb', () => {

	afterAll(() => {
		mongoose.connection.close();
	})

	test('Should to connect mongo db', async() => {
		const connected = await MongoDatabase.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoURL: process.env.MONGO_URL!,
		})

		expect(connected).toBe(true)
	})

	test('Should throw an error', async() => {
		try {
			const connected = await MongoDatabase.connect({
			dbName: process.env.MONGO_DB_NAME!,
			mongoURL: 'Bad request mongo connect',
		});		
			expect(true).toBe(false)
		} catch (error) {
				
		}
		

	})
})
