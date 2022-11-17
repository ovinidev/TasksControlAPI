import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser';
import { verifyUserOwnerOfTask } from '../middlewares/verifyUserOwnerOfTask';
import { TaskRepository } from '../modules/task/repository/TaskRepository';
import createTaskController from '../modules/task/useCases/CreateTask';
import findTaskByUserController from '../modules/task/useCases/FindTaskByUser';
import updateTaskController from '../modules/task/useCases/UpdateTask';
import deleteTaskController from '../modules/task/useCases/DeleteTask';

export const taskRoutes = Router();

taskRoutes.post('/', authenticateUser, async (req, res) => {
  return createTaskController().handle(req, res);
});

taskRoutes.get('/', async (req, res) => {
  try {
    const taskRepository = new TaskRepository();

    const tasks = await taskRepository.findAll();

    return res.json({ tasks });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
});

taskRoutes.get('/me', authenticateUser, async (req, res) => {
  return findTaskByUserController().handle(req, res);
});

taskRoutes.get(
  '/me/:taskId',
  authenticateUser,
  verifyUserOwnerOfTask,
  async (req, res) => {
    try {
      const taskRepository = new TaskRepository();

      const { taskId } = req.params;

      const task = await taskRepository.findByTaskId(taskId);

      return res.json(task);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  },
);

taskRoutes.patch(
  '/me/:taskId',
  authenticateUser,
  verifyUserOwnerOfTask,
  async (req, res) => {
    return updateTaskController().handle(req, res);
  },
);

taskRoutes.delete(
  '/me/:taskId',
  authenticateUser,
  verifyUserOwnerOfTask,
  (req, res) => {
    return deleteTaskController().handle(req, res);
  },
);
