import { prisma } from '../../../services/prismaClient';
import { ICreateUserDTO, IUpdateUserDTO, IUser } from '../interfaces/IUser';
import { IUserRepository } from '../repository/IUserRepository';

export class UserRepositoryMock implements IUserRepository {
  users: IUser[] = [];

  async create({
    email,
    name,
    password,
    avatarUrl,
  }: ICreateUserDTO): Promise<IUser> {
    const user = {
      id: Math.random().toString(36),
      name,
      email,
      password,
      avatarUrl,
    } as IUser;

    this.users.push(user);

    return user;
  }

  async findAll(): Promise<IUser[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find((user) => {
      return user.email === email;
    });

    return user ? user : null;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = this.users.find((user) => {
      return user.id === id;
    });

    return user ? user : null;
  }

  async update(id: string, data: IUpdateUserDTO): Promise<void> {
    const userToUpdate = this.users.find((user) => {
      return user.id === id;
    });

    const users = this.users.filter((user) => {
      return user.id !== id;
    });

    this.users = users;

    const userUpdated = {
      email: data.email,
      name: data.name,
      password: data.password,
      id,
      avatarUrl: data.avatarUrl,
      createdAt: userToUpdate?.createdAt,
    } as IUser;

    this.users.push(userUpdated);
  }
}
