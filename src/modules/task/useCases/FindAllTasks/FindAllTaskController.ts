import { Request, Response } from 'express';
import { FindAllTaskUseCase } from './FindAllTaskUseCase';

export class FindAllTaskController {
	constructor(private findTasksByUserUseCase: FindAllTaskUseCase) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const tasks = await this.findTasksByUserUseCase.execute();

			return res.status(200).json({ tasks });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
