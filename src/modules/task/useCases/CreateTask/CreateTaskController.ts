import { Request, Response } from 'express';
import { z } from 'zod';
import { AppError } from '../../../../errors/AppError';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
  constructor(private createTaskUseCase: CreateTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const createUsersBody = z.object({
        name: z.string(),
        description: z.string(),
        date: z.string(),
        hours: z.number().min(1),
      });

      const { name, description, date, hours } = createUsersBody.parse(
        req.body,
      );
      const { id } = req.user;

      if (!id) {
        throw new AppError('User not found');
      }

      const taskCreated = await this.createTaskUseCase.execute({
        name,
        description,
        date: new Date(date).toISOString(),
        hours,
        userId: id,
      });

      return res.status(201).json({ message: taskCreated });
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
