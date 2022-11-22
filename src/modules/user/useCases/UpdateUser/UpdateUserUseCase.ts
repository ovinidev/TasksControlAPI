import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { IUpdateUserDTO, IUser } from '../../interfaces/IUser';
import { IUserRepository } from '../../repository/IUserRepository';

@injectable()
export class UpdateUserUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute(id: string, data: IUpdateUserDTO): Promise<IUser> {
		if (data.email) {
			const emailAlreadyExist = await this.userRepository.findByEmail(
				data.email,
			);

			if (emailAlreadyExist) {
				throw new Error('Email already exist');
			}
		}

		return await this.userRepository.update(id, data);
	}
}
