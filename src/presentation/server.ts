import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infra/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infra/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service"

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource(),
)

export class Server {
	public static start(){
		console.log('Server started...')

		CronService.createJob(
			'*/5 * * * * *',
			() => {
				// new CheckService().execute('https://google.com.ar');
				// const url = 'http://localhost:3000';
				const url = 'http://google.com.ar';
				new CheckService(
					fileSystemLogRepository,
					() => console.log(`${url} is ok`),
					(error) => console.log(error)
					).execute(url);
			},
		);
	}
}
