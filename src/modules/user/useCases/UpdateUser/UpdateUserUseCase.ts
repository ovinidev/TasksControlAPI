import { IUpdateUserDTO } from '../../interfaces/IUser';
import { IUserRepository } from '../../repository/IUserRepository';

export class UpdateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute(id: string, data: IUpdateUserDTO): Promise<void> {
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
