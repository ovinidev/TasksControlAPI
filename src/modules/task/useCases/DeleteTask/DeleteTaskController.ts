import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

export class DeleteTaskController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);
			const { taskId } = req.params;

			if (!taskId) {
				return res.status(400).json({ message: 'Task id not provided' });
			}

			await deleteTaskUseCase.execute(taskId);

			return res.status(204).json({ message: 'Task has been deleted' });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
