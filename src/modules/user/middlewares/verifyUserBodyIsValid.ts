import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function verifyUserBodyIsValid(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
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

		console.log(req.body);
		const { name, email, password } = createUserBody.parse(req.body);

		const avatarUrl = req.file?.filename;

		req.user = {
			name,
			email,
			password,
			avatarUrl,
		};

		next();
	} catch (err: any) {
		const error = err.issues[0].message;
		return res.status(400).json({
			message: error,
		});
	}
}
