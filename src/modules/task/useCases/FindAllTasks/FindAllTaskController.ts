import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindAllTaskUseCase } from './FindAllTaskUseCase';

export class FindAllTaskController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const findTasksByUserUseCase = container.resolve(FindAllTaskUseCase);
			const tasks = await findTasksByUserUseCase.execute();

			return res.status(200).json({ tasks });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
