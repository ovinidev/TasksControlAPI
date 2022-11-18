import { ITask } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';

export class FindTasksByUserIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(
    userId: string,
    order?: 'desc' | 'asc',
  ): Promise<ITask[] | null> {
    return await this.taskRepository.findByUserId(userId, order);
  }
}
