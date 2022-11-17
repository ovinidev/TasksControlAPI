import { TaskRepository } from '../../repository/TaskRepository';
import { FindTasksByUserController } from './FindTasksByUserController';
import { FindTasksByUserUseCase } from './FindTasksByUserUseCase';

export default () => {
  const taskRepository = new TaskRepository();

  const findTaskByUserUseCase = new FindTasksByUserUseCase(taskRepository);

  const findTaskByUserController = new FindTasksByUserController(
    findTaskByUserUseCase,
  );

  return findTaskByUserController;
};
