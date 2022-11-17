import { Router } from 'express';
import { verifyUserOwnerOfTask } from '../middlewares/verifyUserOwnerOfTask';

import createTaskController from '../modules/task/useCases/CreateTask';
import findTaskByUserController from '../modules/task/useCases/FindTaskByUser';
import updateTaskController from '../modules/task/useCases/UpdateTask';
import deleteTaskController from '../modules/task/useCases/DeleteTask';
import findAllTasksController from '../modules/task/useCases/FindAllTasks';
import findTaskByTaskIdController from '../modules/task/useCases/FindTaskByTaskId';
import { authenticateUser } from '../middlewares/authenticateUser';

export const taskRoutes = Router();

taskRoutes.get('/', async (req, res) => {
  return findAllTasksController().handle(req, res);
});

taskRoutes.use(authenticateUser);

taskRoutes.post('/', async (req, res) => {
  return createTaskController().handle(req, res);
});

taskRoutes.get('/me', async (req, res) => {
  return findTaskByUserController().handle(req, res);
});

taskRoutes.get('/me/:taskId', verifyUserOwnerOfTask, async (req, res) => {
  return findTaskByTaskIdController().handle(req, res);
});

taskRoutes.patch('/me/:taskId', verifyUserOwnerOfTask, async (req, res) => {
  return updateTaskController().handle(req, res);
});

taskRoutes.delete('/me/:taskId', verifyUserOwnerOfTask, (req, res) => {
  return deleteTaskController().handle(req, res);
});
