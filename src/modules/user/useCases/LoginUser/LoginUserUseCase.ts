import { AppError } from '../../../../errors/AppError';
import { ILoginUserDTO, IUserResponse } from '../../interfaces/IUser';
import { IUserRepository } from '../../repository/IUserRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../../../../constants/secretKey';

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ email, password }: ILoginUserDTO): Promise<IUserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('email or password incorrect', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('email or password incorrect', 401);
    }

    const token = sign({}, SECRET_KEY, {
      subject: user.id,
      expiresIn: '1d',
    });

    const response = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return response;
  }
}
