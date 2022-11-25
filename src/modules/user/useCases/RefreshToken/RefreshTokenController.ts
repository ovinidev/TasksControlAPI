import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenController {
	async handle(req: Request, res: Response): Promise<Response> {
		try {
			const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

			const authHeader = req.headers.authorization;

			if (!authHeader) {
				return res.status(400).json({ message: 'Refresh token is missing' });
			}

			const [, refresh_token] = authHeader.split(' ');

			const { token, refreshToken } = await refreshTokenUseCase.execute(
				refresh_token,
			);

			return res.status(200).json({ token, refreshToken: refreshToken });
		} catch (err: any) {
			return res.status(401).json({ message: err.message });
		}
	}
}
