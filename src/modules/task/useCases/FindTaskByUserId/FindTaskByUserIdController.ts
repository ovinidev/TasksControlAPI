import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindTaskByUserIdUseCase } from './FindTaskByUserIdUseCase';

export class FindTaskByUserIdController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const findTasksByUserIdUseCase = container.resolve(
				FindTaskByUserIdUseCase,
			);
			const { id } = req.user;

			const { order }: any = req.query;

			const tasks = await findTasksByUserIdUseCase.execute(id, order);

			return res.status(200).json({ tasks });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
