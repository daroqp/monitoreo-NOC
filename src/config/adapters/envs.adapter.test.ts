import { envs } from './envs.adapter'

describe('envs adapter.ts', () => {
	test('Should return env options', () => {

		expect(envs).toEqual({
			PORT: 3000,
			MAILER_SERVICE: 'gmail',
			MAILER_EMAIL: 'daro.qp@gmail.com',
			MAILER_SECRET_KEY: 'exkezehqsfjyegur',
			PROD: false,
			MONGO_URL: 'mongodb://daro:123456789@localhost:27018',
			MONGO_DB_NAME: 'NOC-TEST',
			MONGO_USER: 'daro',
			MONGO_PASS: '123456789'
		});
	});

	test('Should return error if not found env', async() => {
		jest.resetModules()
		process.env.PORT = 'ABC'

		try {
			await import('./envs.adapter')	
			expect(true).toBe(false)
		} catch (error) {
			expect(`${error}`).toContain('"PORT" should be a valid integer')
		}
	})
});
