import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { SECRET_KEY } from '../../../../constants/secretKey';
import { IUserRepository } from '../../repository/IUserRepository';

interface IRefreshTokenVerified {
	sub: string;
}

@injectable()
export class RefreshTokenUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute(refreshToken: string) {
		try {
			const { sub: id } = verify(
				refreshToken,
				SECRET_KEY,
			) as IRefreshTokenVerified;

			const token = sign({}, SECRET_KEY, {
				subject: id,
				expiresIn: '1d',
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
