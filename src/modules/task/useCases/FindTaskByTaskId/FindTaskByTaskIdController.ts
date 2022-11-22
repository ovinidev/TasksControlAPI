import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindTaskByTaskIdUseCase } from './FindTaskByTaskIdUseCase';

export class FindTaskByTaskIdController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const findTaskByTaskIdUseCase = container.resolve(
				FindTaskByTaskIdUseCase,
			);
			const { taskId } = req.params;

			const task = await findTaskByTaskIdUseCase.execute(taskId);

			return res.status(200).json({ task });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
