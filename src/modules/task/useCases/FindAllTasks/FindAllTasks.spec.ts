/* eslint-disable prefer-const */
import { TaskRepositoryMock } from '../../mock/TaskRepositoryMock';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { FindAllTaskUseCase } from './FindAllTaskUseCase';

let taskRepositoryMock: TaskRepositoryMock;
let findAllTaskUseCase: FindAllTaskUseCase;
let createTaskUseCase: CreateTaskUseCase;

describe('Find all tasks', () => {
	beforeEach(() => {
		taskRepositoryMock = new TaskRepositoryMock();
		findAllTaskUseCase = new FindAllTaskUseCase(taskRepositoryMock);
		createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock);
	});

	it('Should be able to view all tasks', async () => {
		const task = {
			name: 'task 1',
			description: 'task description',
			date: 'Thu Nov 17 2022 11:58:59 GMT-0300 (Brasilia Standard Time)',
			hours: 1,
			userId: '1234',
		};

		await createTaskUseCase.execute(task);
		await createTaskUseCase.execute(task);

		const allTasks = await findAllTaskUseCase.execute();

		expect(allTasks).toHaveLength(2);
	});
});
