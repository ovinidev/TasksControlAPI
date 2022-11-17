import { Request, Response } from 'express';
import { FindTaskByTaskIdUseCase } from './FindTaskByTaskIdUseCase';

export class FindTaskByTaskIdController {
  constructor(private FindTaskByTaskId: FindTaskByTaskIdUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { taskId } = req.params;

      const task = await this.FindTaskByTaskId.execute(taskId);

      return res.status(200).json({ task });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
