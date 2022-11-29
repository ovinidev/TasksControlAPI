/* eslint-disable prefer-const */
import { TaskRepositoryMock } from '../../mock/TaskRepositoryMock';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';

let taskRepositoryMock: TaskRepositoryMock;
let updateTaskUseCase: UpdateTaskUseCase;
let createTaskUseCase: CreateTaskUseCase;

describe('Update task', () => {
	beforeEach(() => {
		taskRepositoryMock = new TaskRepositoryMock();
		updateTaskUseCase = new UpdateTaskUseCase(taskRepositoryMock);
		createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock);
	});

	it('Should be able to update a task', async () => {
		const task = {
			name: 'task',
			description: 'task original description',
			date: 'Thu Nov 17 2022 11:58:59 GMT-0300 (Brasilia Standard Time)',
			hours: 1,
			userId: '1234',
		};

		const taskCreated = createTaskUseCase.execute(task);
		createTaskUseCase.execute(task);

		const taskUpdate = {
			name: 'task updated',
			description: 'task modification description',
			date: 'Thu Nov 17 2022 11:58:59 GMT-0300 (Brasilia Standard Time)',
			hours: 1,
			userId: '1234',
		};

		const taskUpdated = await updateTaskUseCase.execute(
			(
				await taskCreated
			).id,
			taskUpdate,
		);

		expect(taskCreated).not.toEqual(taskUpdated);
	});
});
