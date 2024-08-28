import fs from 'fs';

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {

	private readonly logPath = '/logs/';
	private readonly allLogPath = '/logs/logs-all.log';
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

    async saveLog(newLog: LogEntity): Promise<void> {

		const logAsJson = `${JSON.stringify(newLog)}\n`;

		fs.appendFileSync(this.allLogPath,logAsJson )

		if( newLog.level === LogSeverityLevel.low ) return;

		if( newLog.level === LogSeverityLevel.medium ) {
			fs.appendFileSync( this.mediumLogPath,logAsJson );
		} else {
			fs.appendFileSync( this.highLogPath, logAsJson );
		}
    }

	private getLogFromFile = (path: string): LogEntity[] => {
		const content = fs.readFileSync(path, 'utf-8');

		const logs = content.split('\n').map(
			log => LogEntity.fromJson(log)
		);

		return logs;
	}

    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

		switch(severityLevel) {
			case LogSeverityLevel.low:
				return this.getLogFromFile(this.allLogPath);
			case LogSeverityLevel.medium:
				return this.getLogFromFile(this.mediumLogPath);
			case LogSeverityLevel.high:
				return this.getLogFromFile(this.highLogPath);
			default:
				throw new Error(`${severityLevel} not implemented.`)
		}
    }
}
