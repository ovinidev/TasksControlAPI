import { TaskRepository } from '../../repository/TaskRepository';
import { UpdateTaskController } from './UpdateTaskController';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export default () => {
  const taskRepository = new TaskRepository();

  const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);

  const updateTaskController = new UpdateTaskController(updateTaskUseCase);

  return updateTaskController;
};
