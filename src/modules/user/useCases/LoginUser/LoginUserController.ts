import { Request, Response } from 'express';
import { z } from 'zod';
import { LoginUserUseCase } from './LoginUserUseCase';

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const createUsersBody = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string(),
      });

      const { email, password } = createUsersBody.parse(req.body);

      const response = await this.loginUserUseCase.execute({
        email,
        password,
      });

      return res.status(200).json(response);
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const error = err.issues[0].message;
        return res.status(400).json({
          message: error,
        });
      }
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
