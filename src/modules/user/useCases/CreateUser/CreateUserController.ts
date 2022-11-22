import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const createUserUseCase = container.resolve(CreateUserUseCase);

			const createUserBody = z.object({
				name: z
					.string({ required_error: 'Name is required' })
					.min(3, { message: 'Name must be at least 3 characters' }),
				email: z
					.string({ required_error: 'Email is required' })
					.email({ message: 'Invalid email' }),
				password: z
					.string({ required_error: 'Password is required' })
					.min(6, { message: 'Password must be at least 6 characters' }),
			});

			const { name, email, password } = createUserBody.parse(req.body);

			const avatarUrl = req.file?.filename;

			await createUserUseCase.execute({
				name,
				email,
				password,
				avatarUrl,
			});

			return res.status(204).json({ message: 'User created successfully.' });
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
