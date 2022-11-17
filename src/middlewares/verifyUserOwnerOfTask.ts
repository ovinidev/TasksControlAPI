import { NextFunction, Request, Response } from 'express';
import { TaskRepository } from '../modules/task/repository/TaskRepository';

export async function verifyUserOwnerOfTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.user;
  const { taskId } = req.params;

  const taskRepository = new TaskRepository();

  const task = await taskRepository.findByTaskId(taskId);

  if (id !== task?.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}
