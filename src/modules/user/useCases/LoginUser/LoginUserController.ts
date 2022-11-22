import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const loginUserUseCase = container.resolve(LoginUserUseCase);

			const createUsersBody = z.object({
				email: z
					.string({ required_error: 'Email is required' })
					.email({ message: 'Invalid email' }),
				password: z.string({ required_error: 'password is required' }),
			});

			const { email, password } = createUsersBody.parse(req.body);

			const response = await loginUserUseCase.execute({
				email,
				password,
			});

			return res.status(200).json(response);
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
