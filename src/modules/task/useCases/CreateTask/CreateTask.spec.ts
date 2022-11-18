/* eslint-disable prefer-const */
import { TaskRepositoryMock } from '../../mock/TaskRepositoryMock';
import { CreateTaskUseCase } from './CreateTaskUseCase';

let taskRepositoryMock: TaskRepositoryMock;
let createTaskUseCase: CreateTaskUseCase;

describe('Create task', () => {
  beforeEach(() => {
    taskRepositoryMock = new TaskRepositoryMock();
    createTaskUseCase = new CreateTaskUseCase(taskRepositoryMock);
  });

  it('Should be able to create a new task', async () => {
    const task = {
      name: 'task 1',
      description: 'task description',
      date: 'Thu Nov 17 2022 11:58:59 GMT-0300 (Brasilia Standard Time)',
      hours: 1,
      userId: '1234',
    };

    const taskCreated = await createTaskUseCase.execute(task);

    expect(taskCreated).toHaveProperty('id');
  });
});
