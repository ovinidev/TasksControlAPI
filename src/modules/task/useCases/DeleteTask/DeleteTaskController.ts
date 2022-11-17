import { Request, Response } from 'express';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

export class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { taskId } = req.params;

      if (!taskId) {
        return res.status(400).json({ message: 'Task id not provided' });
      }

      await this.deleteTaskUseCase.execute(taskId);

      return res.status(204).json({ message: 'Task deleted' });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
