import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export class UpdateTaskController {
	constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { name, description, date, hours } = req.body;

			const { taskId } = req.params;

			const task = await this.updateTaskUseCase.execute(taskId, {
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
