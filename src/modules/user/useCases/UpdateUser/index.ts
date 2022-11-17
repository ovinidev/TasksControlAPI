import { UserRepository } from '../../repository/UserRepository';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export default () => {
  const userRepository = new UserRepository();

  const updateUserUseCase = new UpdateUserUseCase(userRepository);

  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
