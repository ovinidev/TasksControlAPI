import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const updateUserUseCase = container.resolve(UpdateUserUseCase);
			const { id } = req.user;
			const avatarUrl = req.file?.filename;

			const updateUserBody = z.object({
				name: z
					.string()
					.min(3, { message: 'Name must be at least 3 characters' })
					.optional(),
				email: z.string().email({ message: 'Invalid email' }).optional(),
				password: z
					.string()
					.min(6, { message: 'Password must be at least 6 characters' })
					.optional(),
			});

			const { name, email, password } = updateUserBody.parse(req.body);

			await updateUserUseCase.execute(id, {
				name,
				email,
				password,
				avatarUrl,
			});

			return res.status(200).json({ message: 'User updated successfully' });
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
