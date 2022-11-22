import { Router } from 'express';

import { verifyUserOwnerOfTask } from '../middlewares/verifyUserOwnerOfTask';
import { CreateTaskController } from '../useCases/CreateTask/CreateTaskController';
import { FindAllTaskController } from '../useCases/FindAllTasks/FindAllTaskController';
import { FindTaskByTaskIdController } from '../useCases/FindTaskByTaskId/FindTaskByTaskIdController';
import { UpdateTaskController } from '../useCases/UpdateTask/UpdateTaskController';
import { DeleteTaskController } from '../useCases/DeleteTask/DeleteTaskController';
import { FindTaskByUserIdController } from '../useCases/FindTaskByUserId/FindTaskByUserIdController';
import { authenticateUser } from '../../user/middlewares/authenticateUser';

export const taskRoutes = Router();

const findAllTaskController = new FindAllTaskController();
taskRoutes.get('/', findAllTaskController.handle);

taskRoutes.use(authenticateUser);

const createTaskController = new CreateTaskController();
taskRoutes.post('/', createTaskController.handle);

const findTaskByUserIdController = new FindTaskByUserIdController();
taskRoutes.get('/me', findTaskByUserIdController.handle);

const findTaskByTaskIdController = new FindTaskByTaskIdController();
taskRoutes.get(
	'/me/:taskId',
	verifyUserOwnerOfTask,
	findTaskByTaskIdController.handle,
);

const updateTaskController = new UpdateTaskController();
taskRoutes.patch(
	'/me/:taskId',
	verifyUserOwnerOfTask,
	updateTaskController.handle,
);

const deleteTaskController = new DeleteTaskController();
taskRoutes.delete(
	'/me/:taskId',
	verifyUserOwnerOfTask,
	deleteTaskController.handle,
);
