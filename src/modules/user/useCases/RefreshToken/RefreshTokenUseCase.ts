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

			const newToken = sign({}, SECRET_KEY, {
				subject: id,
				expiresIn: '1d',
			});

			return newToken;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}
}
