import { ITaskRepository } from '../../repository/ITaskRepository';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.delete(taskId);
  }
}
