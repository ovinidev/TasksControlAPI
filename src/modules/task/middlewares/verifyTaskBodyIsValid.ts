import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export function verifyTaskBodyIsValid(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const createTaskBody = z.object({
			name: z.string({ required_error: 'Name is required' }),
			description: z.string({ required_error: 'Description is required' }),
			date: z.string({ required_error: 'Date is required' }),
			hours: z
				.number({ required_error: 'Hours is required' })
				.min(1, { message: 'Hours must be at least 1' }),
		});

		const { name, description, date, hours } = createTaskBody.parse(req.body);

		req.task = {
			name,
			description,
			date,
			hours,
		};

		next();
	} catch (err: any) {
		const error = err.issues[0].message;
		return res.status(400).json({
			message: error,
		});
	}
}
