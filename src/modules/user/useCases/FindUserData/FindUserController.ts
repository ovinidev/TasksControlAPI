import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindUserDataUseCase } from './FindUserDataUseCase';

export class FindUserDataController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.user;
			const findUserDataUseCase = container.resolve(FindUserDataUseCase);

			const user = await findUserDataUseCase.execute(id);

			return res.status(200).json({
				id: user.id,
				name: user.name,
				email: user.email,
				avatarUrl: user.avatarUrl,
			});
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
