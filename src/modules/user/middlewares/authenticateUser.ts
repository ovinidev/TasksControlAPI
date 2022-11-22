import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../../../constants/secretKey';
import { UserRepository } from '../repository/UserRepository';

interface ITokenVerified {
	sub: string;
}

export async function authenticateUser(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(400).json({ message: 'Token is missing' });
		}

		const [, token] = authHeader.split(' ');

		const { sub: id } = verify(token, SECRET_KEY) as ITokenVerified;

		const userRepository = new UserRepository();

		const userAlreadyExists = await userRepository.findById(id);

		if (!userAlreadyExists) {
			return res.status(401).json({ message: 'User does not exists' });
		}

		req.user = {
			id: id,
		};

		next();
	} catch (err: any) {
		return res.status(401).json({ message: err.message });
	}
}
