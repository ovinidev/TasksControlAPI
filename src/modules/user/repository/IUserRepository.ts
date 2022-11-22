import { ICreateUserDTO, IUpdateUserDTO, IUser } from '../interfaces/IUser';

export interface IUserRepository {
	create(data: ICreateUserDTO): Promise<IUser>;
	findAll(): Promise<IUser[]>;
	findByEmail(email: string): Promise<IUser | null>;
	findById(id: string): Promise<IUser | null>;
	update(id: string, data: IUpdateUserDTO): Promise<IUser>;
}
