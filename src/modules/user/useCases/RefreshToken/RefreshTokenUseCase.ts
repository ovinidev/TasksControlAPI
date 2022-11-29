import { sign, verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../../../../constants/secretKey';

interface IRefreshTokenVerified {
	sub: string;
}

export class RefreshTokenUseCase {
	async execute(refreshToken: string) {
		try {
			const { sub: id } = verify(
				refreshToken,
				SECRET_KEY,
			) as IRefreshTokenVerified;

			const token = sign({}, SECRET_KEY, {
				subject: id,
				expiresIn: '1h',
			});

			const newRefreshToken = sign({}, SECRET_KEY, {
				subject: id,
				expiresIn: '7d',
			});

			return { token, refreshToken: newRefreshToken };
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
