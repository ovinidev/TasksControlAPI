import { TaskRepository } from '../../repository/TaskRepository';
import { FindTaskByTaskIdUseCase } from './FindTaskByTaskIdUseCase';
import { FindTaskByTaskIdController } from './FindTaskByTaskIdController';

export default () => {
  const taskRepository = new TaskRepository();

  const findTaskByTaskIdUseCase = new FindTaskByTaskIdUseCase(taskRepository);

  const findTaskByTaskIdController = new FindTaskByTaskIdController(
    findTaskByTaskIdUseCase,
  );

  return findTaskByTaskIdController;
};
