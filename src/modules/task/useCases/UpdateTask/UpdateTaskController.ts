import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export class UpdateTaskController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const updateTaskUseCase = container.resolve(UpdateTaskUseCase);
			const { name, description, date, hours } = req.body;

			const { taskId } = req.params;

			const task = await updateTaskUseCase.execute(taskId, {
				name,
				description,
				date: date && new Date(date).toISOString(),
				hours,
			});

			return res.status(204).json({ message: task });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
