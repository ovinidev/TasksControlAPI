import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const avatarUrl = req.file?.filename;

      const createUsersBody = z.object({
        name: z
          .string()
          .min(3, { message: 'Name must be at least 3 characters' })
          .optional(),
        email: z.string().email({ message: 'Invalid email' }).optional(),
        password: z
          .string()
          .min(6, { message: 'Password must be at least 6 characters' })
          .optional(),
      });

      const { name, email, password } = createUsersBody.parse(req.body);

      await this.updateUserUseCase.execute(id, {
        name,
        email,
        password,
        avatarUrl,
      });

      return res.status(200).json({ message: 'User updated' });
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
