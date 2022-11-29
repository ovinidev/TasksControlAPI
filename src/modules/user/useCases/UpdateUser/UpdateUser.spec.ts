/* eslint-disable prefer-const */
import { ICreateUserDTO } from '../../interfaces/IUser';
import { UserRepositoryMock } from '../../mock/UserRepositoryMock';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { UpdateUserUseCase } from './UpdateUserUseCase';

let taskRepositoryMock: UserRepositoryMock;
let updateUserUseCase: UpdateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Update user', () => {
	beforeEach(() => {
		taskRepositoryMock = new UserRepositoryMock();
		updateUserUseCase = new UpdateUserUseCase(taskRepositoryMock);
		createUserUseCase = new CreateUserUseCase(taskRepositoryMock);
	});

	it('Should be able to update a user', async () => {
		const user = {
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password: '123456',
		} as ICreateUserDTO;

		const userCreated = await createUserUseCase.execute(user);

		const userForUpdate = {
			id: userCreated.id,
			name: 'John Doe Updated',
		};

		const userUpdated = await updateUserUseCase.execute(
			userForUpdate.id,
			userForUpdate,
		);

		expect(userUpdated).not.toEqual(userCreated);
	});
});
