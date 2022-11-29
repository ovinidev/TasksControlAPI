/* eslint-disable prefer-const */
import { TaskRepositoryMock } from '../../mock/TaskRepositoryMock';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { FindTaskByUserIdUseCase } from './FindTaskByUserIdUseCase';

let taskRepositoryMock: TaskRepositoryMock;
let findTasksByUserIdUseCase: FindTaskByUserIdUseCase;
let createTaskUseCase: CreateTaskUseCase;

describe('Find0 task by user id', () => {
	beforeEach(() => {
		taskRepositoryMock = new TaskRepositoryMock();
		findTasksByUserIdUseCase = new FindTaskByUserIdUseCase(taskRepositoryMock);
		createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock);
	});

	it('Should be able to view user tasks bt user id', async () => {
		const task = {
			name: 'task 1',
			description: 'task description',
			date: 'Thu Nov 17 2022 11:58:59 GMT-0300 (Brasilia Standard Time)',
			hours: 1,
			userId: '1234',
		};

		const taskCreated = createTaskUseCase.execute(task);
		createTaskUseCase.execute(task);

		const userId = (await taskCreated).userId as string;

		const tasksSearched = await findTasksByUserIdUseCase.execute(userId);

		expect(tasksSearched).toHaveLength(2);
	});
});
