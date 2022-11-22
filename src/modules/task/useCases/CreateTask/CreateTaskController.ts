import { Request, Response } from 'express';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
	constructor(private createTaskUseCase: CreateTaskUseCase) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { name, description, date, hours } = req.task;
			const { id } = req.userId;

			const taskCreated = await this.createTaskUseCase.execute({
				name,
				description,
				date: new Date(date).toISOString(),
				hours,
				userId: id,
			});

			return res.status(201).json({ message: taskCreated });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
