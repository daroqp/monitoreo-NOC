import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infra/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infra/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource(),
)

export class Server {
	public static start(){
		console.log('Server started...')

		//mandar email

		// const emailService = new EmailService();
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

		// CronService.createJob(
		// 	'*/5 * * * * *',
		// 	() => {
		// 		// new CheckService().execute('https://google.com.ar');
		// 		// const url = 'http://localhost:3000';
		// 		const url = 'http://google.com.ar';
		// 		new CheckService(
		// 			fileSystemLogRepository,
		// 			() => console.log(`${url} is ok`),
		// 			(error) => console.log(error)
		// 			).execute(url);
		// 	},
		// );
	}
}
