import 'reflect-metadata';
import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../interfaces/IUser';
import { IUserRepository } from '../../repository/IUserRepository';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,
	) {}

	async execute({ email, name, password, avatarUrl }: ICreateUserDTO) {
		const userAlreadyExists = await this.userRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new AppError('User already exists', 400);
		}

		const hashPassword = await hash(password, 8);

		return await this.userRepository.create({
			email,
			name,
			password: hashPassword,
			avatarUrl,
		});
	}
}
