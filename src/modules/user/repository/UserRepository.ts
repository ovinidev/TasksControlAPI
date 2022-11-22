import { prisma } from '../../../services/prismaClient';
import { ICreateUserDTO, IUpdateUserDTO, IUser } from '../interfaces/IUser';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
	async create({
		email,
		name,
		password,
		avatarUrl,
	}: ICreateUserDTO): Promise<IUser> {
		return await prisma.user.create({
			data: {
				name,
				email,
				password,
				avatarUrl,
			},
		});
	}

	async findAll(): Promise<IUser[]> {
		return await prisma.user.findMany();
	}

	async findByEmail(email: string): Promise<IUser | null> {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async findById(id: string): Promise<IUser | null> {
		return await prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	async update(id: string, data: IUpdateUserDTO): Promise<IUser> {
		return await prisma.user.update({
			where: {
				id,
			},
			data: {
				email: data.email,
				name: data.name,
				password: data.password,
				avatarUrl: data.avatarUrl,
			},
		});
	}
}
