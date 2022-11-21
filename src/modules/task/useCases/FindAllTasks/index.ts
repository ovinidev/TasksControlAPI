import { TaskRepository } from '../../repository/TaskRepository';
import { FindAllTaskController } from './FindAllTaskController';
import { FindAllTaskUseCase } from './FindAllTaskUseCase';

export default () => {
	const taskRepository = new TaskRepository();

	const findAllTasksUseCase = new FindAllTaskUseCase(taskRepository);

	const findAllTasksController = new FindAllTaskController(findAllTasksUseCase);

	return findAllTasksController;
};
