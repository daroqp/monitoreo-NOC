import { envs } from "./config/adapters/envs.adapter";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server"

(async() => {
	main()	
})()

async function main(){
	
	await MongoDatabase.connect({
		mongoURL:envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME,
	});

	// const prisma = new PrismaClient();
	// const newLog = await prisma.logModel.create({
	// 	data: {
	// 		level: 'HIGH',
	// 		message: 'Test Message',
	// 		origin: 'App.ts'
	// 	}
	// })

	// const logs = await prisma.logModel.findMany({
	// 	where: {
	// 		level: 'HIGH'
	// 	}
	// });
	// console.log(logs)

	Server.start();
}
