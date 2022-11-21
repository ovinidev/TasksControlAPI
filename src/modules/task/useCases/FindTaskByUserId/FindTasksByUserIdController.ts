import { Request, Response } from 'express';
import { FindTasksByUserIdUseCase } from './FindTasksByUserIdUseCase';

export class FindTasksByUserIdController {
  constructor(private findTasksByUserIdUseCase: FindTasksByUserIdUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { order }: any = req.query;

      const tasks = await this.findTasksByUserIdUseCase.execute(id, order);

      return res.status(200).json({ tasks });
    } catch (err: any) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
}
