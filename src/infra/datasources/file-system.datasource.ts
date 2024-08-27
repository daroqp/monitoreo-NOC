import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {

	private readonly logPath = '/logs/';
	private readonly allLogPath = '/logs/logs-low.log';
	private readonly mediumLogPath = '/logs/logs-medium.log';
	private readonly highLogPath = '/logs/logs-high.log';

	constructor(){
		this.createLogsFiles();
	}

	private createLogsFiles = () => {
		if ( !fs.existsSync(this.logPath) ) {
			fs.mkdirSync(this.logPath);
		}

		[
			this.allLogPath,
			this.mediumLogPath,
			this.highLogPath,
		].forEach(path => {
			if( fs.existsSync(path) ) return
			fs.writeFileSync(path, '');
		});
	}

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
}
