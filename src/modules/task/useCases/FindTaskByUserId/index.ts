import { TaskRepository } from '../../repository/TaskRepository';
import { FindTaskByUserIdController } from './FindTaskByUserIdController';
import { FindTaskByUserIdUseCase } from './FindTaskByUserIdUseCase';

export default () => {
	const taskRepository = new TaskRepository();

	const findTaskByUserIdUseCase = new FindTaskByUserIdUseCase(taskRepository);

	const findTaskByUserIdController = new FindTaskByUserIdController(
		findTaskByUserIdUseCase,
	);

	return findTaskByUserIdController;
};
