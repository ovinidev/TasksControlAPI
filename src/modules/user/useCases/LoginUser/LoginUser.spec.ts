/* eslint-disable prefer-const */
import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../interfaces/IUser';
import { UserRepositoryMock } from '../../mock/UserRepositoryMock';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { LoginUserUseCase } from './LoginUserUseCase';

let userRepositoryMock: UserRepositoryMock;
let loginUserUseCase: LoginUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Create task', () => {
  beforeEach(() => {
    userRepositoryMock = new UserRepositoryMock();
    loginUserUseCase = new LoginUserUseCase(userRepositoryMock);
    createUserUseCase = new CreateUserUseCase(userRepositoryMock);
  });

  it('Should be able to login', async () => {
    const user = {
      name: 'John Doe',
      email: 'vini@gmail.com',
      password: '123456',
    } as ICreateUserDTO;

    await createUserUseCase.execute(user);

    const userLogged = await loginUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userLogged).toHaveProperty('token');
  });

  it('Should not be able to login with password incorrectly', async () => {
    expect(async () => {
      const user = {
        name: 'John Doe',
        email: 'vini@gmail.com',
        password: '123456',
      } as ICreateUserDTO;

      await createUserUseCase.execute(user);

      await loginUserUseCase.execute({
        email: user.email,
        password: '134242342',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to login with email incorrectly', async () => {
    expect(async () => {
      const user = {
        name: 'John Doe',
        email: 'vini@gmail.com',
        password: '123456',
      } as ICreateUserDTO;

      await createUserUseCase.execute(user);

      await loginUserUseCase.execute({
        email: 'error@gmail.com',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to login with account not found', async () => {
    expect(async () => {
      await loginUserUseCase.execute({
        email: 'error@gmail.com',
        password: '23242423432',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
