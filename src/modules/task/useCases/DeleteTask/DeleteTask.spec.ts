/* eslint-disable prefer-const */
import { TaskRepositoryMock } from '../../mock/TaskRepositoryMock';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

let taskRepositoryMock: TaskRepositoryMock;
let deleteTaskUseCase: DeleteTaskUseCase;
let createTaskUseCase: CreateTaskUseCase;

describe('Delete task', () => {
	beforeEach(() => {
		taskRepositoryMock = new TaskRepositoryMock();
		deleteTaskUseCase = new DeleteTaskUseCase(taskRepositoryMock);
		createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock);
	});

	it('Should be able to delete a task', async () => {
		const task = {
			name: 'task 1',
			description: 'task description',
			date: 'Thu Nov 17 2022 11:58:59 GMT-0300 (Brasilia Standard Time)',
			hours: 1,
			userId: '1234',
		};

		const taskCreated = await createTaskUseCase.execute(task);

		await deleteTaskUseCase.execute(taskCreated.id);

		const taskSearched = await taskRepositoryMock.findByTaskId(taskCreated.id);

		expect(taskSearched).toBeNull();
	});

	it('Should not be able to delete a task if not user created', async () => {
		const task = {
			name: 'task 1',
			description: 'task description',
			date: 'Thu Nov 17 2022 11:58:59 GMT-0300 (Brasilia Standard Time)',
			hours: 1,
			userId: '1234',
		};

		const taskCreated = await createTaskUseCase.execute(task);

		await deleteTaskUseCase.execute(taskCreated.id);

		expect(taskCreated?.userId).toEqual(task.userId);
	});
});
