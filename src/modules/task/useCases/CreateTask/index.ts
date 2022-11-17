import { TaskRepository } from '../../repository/TaskRepository';
import { CreateTaskController } from './CreateTaskController';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export default () => {
  const taskRepository = new TaskRepository();

  const createTaskUseCase = new CreateTaskUseCase(taskRepository);

  const createTaskController = new CreateTaskController(createTaskUseCase);

  return createTaskController;
};
