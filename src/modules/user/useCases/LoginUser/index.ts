import { UserRepository } from '../../repository/UserRepository';
import { LoginUserController } from './LoginUserController';
import { LoginUserUseCase } from './LoginUserUseCase';

export default () => {
  const userRepository = new UserRepository();

  const loginUserUseCase = new LoginUserUseCase(userRepository);

  const loginUserController = new LoginUserController(loginUserUseCase);

  return loginUserController;
};
