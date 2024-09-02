import mongoose from 'mongoose'

interface ConnectionOptions {
	mongoURL: string;
	dbName: string;
}

export class MongoDatabase {
	
	static async connect(options: ConnectionOptions) {
		
		const { mongoURL, dbName } = options;

		try {
			
			await mongoose.connect(mongoURL, {
				dbName: dbName,
			})

			// console.log('Mongo connected!');
			
			return true

		} catch (error) {
			throw error;
		}
	}
}
