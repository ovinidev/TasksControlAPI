/* eslint-disable prefer-const */
import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../interfaces/IUser';
import { UserRepositoryMock } from '../../mock/UserRepositoryMock';
import { CreateUserUseCase } from './CreateUserUseCase';

let taskRepositoryMock: UserRepositoryMock;
let createUserUseCase: CreateUserUseCase;

describe('Create user', () => {
	beforeEach(() => {
		taskRepositoryMock = new UserRepositoryMock();
		createUserUseCase = new CreateUserUseCase(taskRepositoryMock);
	});

	it('Should be able to create a new user', async () => {
		const user = {
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password: '123456',
		} as ICreateUserDTO;

		const userCreated = await createUserUseCase.execute(user);

		expect(userCreated).toHaveProperty('id');
	});

	it('Should not be able to create a new user with email existing', async () => {
		const user = {
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password: '123456',
		} as ICreateUserDTO;

		expect(async () => {
			await createUserUseCase.execute(user);
			await createUserUseCase.execute(user);
		}).rejects.toThrow(AppError);
	});

	it('Should not be able to create a new user with email invalid', async () => {
		const user = {
			name: 'John Doe',
			email: 'johndoeedasdas',
			password: '123456',
		} as ICreateUserDTO;

		expect(async () => {
			await createUserUseCase.execute(user);
		}).rejects.toThrow(Error);
	});

	it('Should not be able to create a new user with password invalid', async () => {
		const user = {
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password: '22',
		} as ICreateUserDTO;

		expect(async () => {
			await createUserUseCase.execute(user);
		}).rejects.toThrow(Error);
	});

	it('Should not be able to create a new user with name invalid', async () => {
		const user = {
			name: 'a',
			email: 'johndoe@gmail.com',
			password: '123456',
		} as ICreateUserDTO;

		expect(async () => {
			await createUserUseCase.execute(user);
		}).rejects.toThrow(Error);
	});
});
