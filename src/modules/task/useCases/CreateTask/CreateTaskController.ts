import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const createTaskUseCase = container.resolve(CreateTaskUseCase);
			const createTaskBody = z.object({
				name: z.string({ required_error: 'Name is required' }),
				description: z.string({ required_error: 'Description is required' }),
				date: z.string({ required_error: 'Date is required' }),
				hours: z
					.number({ required_error: 'Hours is required' })
					.min(1, { message: 'Hours must be at least 1' }),
			});

			const { name, description, date, hours } = createTaskBody.parse(req.body);

			const { id } = req.user;

			const taskCreated = await createTaskUseCase.execute({
				name,
				description,
				date: new Date(date).toISOString(),
				hours,
				userId: id,
			});

			return res.status(201).json({ message: taskCreated });
		} catch (err: any) {
			if (err instanceof z.ZodError) {
				const error = err.issues[0].message;
				return res.status(400).json({
					message: error,
				});
			}
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
