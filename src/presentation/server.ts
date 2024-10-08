import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infra/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infra/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infra/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infra/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";

const postgresLogRepository = new LogRepositoryImpl(
	new PostgresLogDatasource(),
)

const mongoLogRepository = new LogRepositoryImpl(
	new MongoLogDatasource(),
)

const fileLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource(),
)

const emailService = new EmailService();

export class Server {
	public static start(){
		console.log('Server started...')

		//TODO: mandar email

		// new SendEmailLogs(
		// 	emailService,
		// 	fileSystemLogRepository
		// ).execute('daro.qp@gmail.com')

		// const emailService = new EmailService(
		// fileSystemLogRepository
		// );
		// emailService.sendEmailWithFileSystemLogs('daro.qp@gmail.com');

		// const emailService = new EmailService();
		// emailService.sendEmail({
		// 	to: 'daro.qp@gmail.com',
		// 	subject: 'Log del sistema',
		// 	htmlBody: `
		// 		<h3>Log del sistema - NOC </h3>
		// 		<p>Cosas que no vienen al caso</p>
		// 		<p>Ver logs adjuntos</p>
		// 	`
		// })

		CronService.createJob(
			'*/5 * * * * *',
			() => {
				// new CheckService().execute('https://google.com.ar');
				// const url = 'http://localhost:3000';
				const url = 'http://google.com.ar';
				new CheckServiceMultiple(
					[postgresLogRepository, mongoLogRepository, fileLogRepository],
					() => console.log(`${url} is ok`),
					(error) => console.log(error)
					).execute(url);
			},
		);
	}
}
