import { TaskRepository } from '../../repository/TaskRepository';
import { DeleteTaskController } from './DeleteTaskController';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

export default () => {
  const taskRepository = new TaskRepository();

  const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

  return deleteTaskController;
};
