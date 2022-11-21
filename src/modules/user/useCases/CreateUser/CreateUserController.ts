import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
import { z } from 'zod';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const createUserBody = z.object({
        name: z
          .string()
          .min(3, { message: 'Name must be at least 3 characters' }),
        email: z.string().email({ message: 'Invalid email' }),
        password: z
          .string()
          .min(6, { message: 'Password must be at least 6 characters' }),
      });

      const avatarUrl = req.file?.filename;

      const { name, email, password } = createUserBody.parse(req.body);

      await this.createUserUseCase.execute({
        name,
        email,
        password,
        avatarUrl,
      });

      return res.status(204).json({ message: 'User created successfully.' });
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
