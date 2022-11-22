import { NextFunction, Request, Response } from 'express';
import { TaskRepository } from '../repository/TaskRepository';

export async function verifyUserOwnerOfTask(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { id: userId } = req.user;
		const { taskId } = req.params;

		const taskRepository = new TaskRepository();

		const task = await taskRepository.findByTaskId(taskId);

		if (!task) {
			return res.status(404).json({ message: 'Task not found' });
		}

		if (userId !== task?.userId) {
			return res.status(401).json({ message: 'Your not a owner of a task' });
		}

		next();
	} catch (err: any) {
		return res.status(400).json({ message: err.message });
	}
}
