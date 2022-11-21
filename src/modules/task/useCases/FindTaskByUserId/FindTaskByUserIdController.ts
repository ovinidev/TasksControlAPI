import { Request, Response } from 'express';
import { FindTaskByUserIdUseCase } from './FindTaskByUserIdUseCase';

export class FindTaskByUserIdController {
	constructor(private findTasksByUserIdUseCase: FindTaskByUserIdUseCase) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.user;
			const { order }: any = req.query;

			const tasks = await this.findTasksByUserIdUseCase.execute(id, order);

			return res.status(200).json({ tasks });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
