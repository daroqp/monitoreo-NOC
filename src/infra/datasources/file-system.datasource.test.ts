import path from "path/posix"
import fs from 'fs'
import { FileSystemDatasource } from "./file-system.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

describe('file sysyem datasource', () => {

	const logPath = path.join(__dirname, '../../../logs')

	beforeEach(() => {

		fs.rmSync(logPath, { recursive: true, force: true });
	})

	test('Should create log files if they do no exits', () => {
		
		new FileSystemDatasource();
		const files = fs.readdirSync(logPath)
		
		expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log']);
	})
	
	test('Should save a log in logs-all.log', () => {

		const logDatasource = new FileSystemDatasource();
		const newLog = new LogEntity({
			message: 'test message',
			level: LogSeverityLevel.low,
			origin: 'file-system.datasource.test.ts',
		})

		logDatasource.saveLog(newLog);
		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

		expect(allLogs).toContain(JSON.stringify(newLog));
	});
	
	test('Should save a log in logs-all.log and logs-medium.log', () => {

		const logDatasource = new FileSystemDatasource();
		const newLog = new LogEntity({
			message: 'test message',
			level: LogSeverityLevel.medium,
			origin: 'file-system.datasource.test.ts',
		})

		logDatasource.saveLog(newLog);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
		const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

		expect(allLogs).toContain(JSON.stringify(newLog));
		expect(mediumLogs).toContain(JSON.stringify(newLog));
	});


	test('Should save a log in logs-all.log and logs-high.log', () => {

		const logDatasource = new FileSystemDatasource();
		const newLog = new LogEntity({
			message: 'test message',
			level: LogSeverityLevel.high,
			origin: 'file-system.datasource.test.ts',
		})

		logDatasource.saveLog(newLog);

		const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
		const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

		expect(allLogs).toContain(JSON.stringify(newLog));
		expect(highLogs).toContain(JSON.stringify(newLog));
	});

	test('Should return all logs', async() => {

		const logDatasource = new FileSystemDatasource();

		const logLow = new LogEntity({
			message: 'low log',
			level: LogSeverityLevel.low,
			origin: 'low',
		});
		
		const mediumLog = new LogEntity({
			message: 'medium log',
			level: LogSeverityLevel.medium,
			origin: 'medium',
		});
	
		const highLog = new LogEntity({
			message: 'high log',
			level: LogSeverityLevel.high,
			origin: 'high',
		});

		await logDatasource.saveLog(logLow);
		await logDatasource.saveLog(mediumLog);
		await logDatasource.saveLog(highLog);

		const logsLow = await logDatasource.getLog(LogSeverityLevel.low)
		const logsMedium = await logDatasource.getLog(LogSeverityLevel.medium)
		const logsHigh = await logDatasource.getLog(LogSeverityLevel.high)

		expect(logsLow).toEqual(expect.arrayContaining([logLow, mediumLog, highLog]))
		expect(logsMedium).toEqual(expect.arrayContaining([mediumLog]))
		expect(logsHigh).toEqual(expect.arrayContaining([highLog]))
	})
})
