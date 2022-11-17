import { Request, Response } from 'express';
import { z } from 'zod';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}

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

      const { taskId } = req.params;

      await this.updateTaskUseCase.execute(taskId, {
        name,
        description,
        date: new Date(date).toISOString(),
        hours,
      });

      return res.status(204).json({ message: 'Task updated' });
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
