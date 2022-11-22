import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
	constructor(private createUserUseCase: CreateUserUseCase) {}

	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password, name, avatarUrl } = req.user;

			await this.createUserUseCase.execute({
				name,
				email,
				password,
				avatarUrl,
			});

			return res.status(204).json({ message: 'User created successfully.' });
		} catch (err: any) {
			return res.status(400).json({
				message: err.message,
			});
		}
	}
}
