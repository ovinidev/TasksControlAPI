import { TaskRepository } from '../../repository/TaskRepository';
import { FindAllTasksController } from './FindAllTasksController';
import { FindAllTasksUseCase } from './FindAllTasksUseCase';

export default () => {
  const taskRepository = new TaskRepository();

  const findAllTasksUseCase = new FindAllTasksUseCase(taskRepository);

  const findAllTasksController = new FindAllTasksController(
    findAllTasksUseCase,
  );

  return findAllTasksController;
};
