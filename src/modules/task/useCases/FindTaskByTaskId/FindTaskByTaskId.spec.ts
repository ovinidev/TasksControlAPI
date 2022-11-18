/* eslint-disable prefer-const */
import { TaskRepositoryMock } from '../../mock/TaskRepositoryMock';
import { CreateTaskUseCase } from '../CreateTask/CreateTaskUseCase';
import { FindTaskByTaskIdUseCase } from './FindTaskByTaskIdUseCase';

let taskRepositoryMock: TaskRepositoryMock;
let findTaskByTaskIdUseCase: FindTaskByTaskIdUseCase;
let createTaskUseCase: CreateTaskUseCase;

describe('Create task', () => {
  beforeEach(() => {
    taskRepositoryMock = new TaskRepositoryMock();
    findTaskByTaskIdUseCase = new FindTaskByTaskIdUseCase(taskRepositoryMock);
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

    const taskCreated = createTaskUseCase.execute(task);

    const taskSearched = await findTaskByTaskIdUseCase.execute(
      (
        await taskCreated
      ).id,
    );

    expect(taskSearched).toHaveProperty('id');
  });
});
