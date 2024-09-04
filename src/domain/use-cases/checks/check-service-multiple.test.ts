import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('check service usecase', () => {

	const mockRepository = {
		saveLog: jest.fn(),
		getLog: jest.fn(), 
	}

	const successCallback = jest.fn();
	const errorCallback = jest.fn();

	const checkService = new CheckServiceMultiple(
		[ mockRepository ],
		successCallback,
		errorCallback,
	);

	beforeEach(() => {
		jest.clearAllMocks();
	})

	test('Should call successCallback when fetch returns true', async() => {

		const wasOk = await checkService.execute('http://google.com.ar')

		expect(wasOk).toBe(true);
		expect(successCallback).toHaveBeenCalled();
		expect(errorCallback).not.toHaveBeenCalled();

		expect(mockRepository.saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		)
	});

	test('Should call errorCallback when fetch return false', async() => {

		const wasOk = await checkService.execute('http://randomurelexxxx')

		expect(wasOk).toBe(false);
		expect(successCallback).not.toHaveBeenCalled();
		expect(errorCallback).toHaveBeenCalled();

		expect(mockRepository.saveLog).toHaveBeenCalledWith(
			expect.any(LogEntity)
		)
	})
})
