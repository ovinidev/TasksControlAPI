import { inject, injectable } from 'tsyringe';
import { IUser } from '../../interfaces/IUser';
import { IUserRepository } from '../../repository/IUserRepository';

@injectable()
export class FindUserDataUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute(id: string): Promise<IUser> {
		const user = await this.userRepository.findById(id);

		if (!user) {
			throw new Error('User not found');
		}

		return user;
	}
}
