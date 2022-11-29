import { ICreateUserDTO } from '../../interfaces/IUser';
import { UserRepositoryMock } from '../../mock/UserRepositoryMock';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { FindUserDataUseCase } from './FindUserDataUseCase';

let userRepositoryMock: UserRepositoryMock;
let findUserDataUseCase: FindUserDataUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Find user data', () => {
	beforeEach(() => {
		userRepositoryMock = new UserRepositoryMock();
		createUserUseCase = new CreateUserUseCase(userRepositoryMock);
		findUserDataUseCase = new FindUserDataUseCase(userRepositoryMock);
	});

	it('Should be able to get user data', async () => {
		const user = {
			name: 'John Doe',
			email: 'vini@gmail.com',
			password: '123456',
		} as ICreateUserDTO;

		const userCreated = await createUserUseCase.execute(user);

		const userData = await findUserDataUseCase.execute(userCreated.id);

		expect(userData).toHaveProperty('name');
	});
});
