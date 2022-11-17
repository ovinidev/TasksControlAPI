import { Request, Response } from 'express';
import { FindTasksByUserUseCase } from './FindTasksByUserUseCase';

export class FindTasksByUserController {
  constructor(private findTasksByUserUseCase: FindTasksByUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { order } = req.query;

      const tasks = await this.findTasksByUserUseCase.execute(id, order as any);

      return res.status(200).json({ tasks });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
