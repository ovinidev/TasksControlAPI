import { TaskRepository } from '../../repository/TaskRepository';
import { FindTasksByUserIdController } from './FindTasksByUserIdController';
import { FindTasksByUserIdUseCase } from './FindTasksByUserIdUseCase';

export default () => {
  const taskRepository = new TaskRepository();

  const findTaskByUserIdUseCase = new FindTasksByUserIdUseCase(taskRepository);

  const findTaskByUserIdController = new FindTasksByUserIdController(
    findTaskByUserIdUseCase,
  );

  return findTaskByUserIdController;
};
