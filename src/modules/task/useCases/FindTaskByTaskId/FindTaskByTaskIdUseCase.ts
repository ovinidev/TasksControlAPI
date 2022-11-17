import { ITask } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';

export class FindTaskByTaskIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<ITask | null> {
    return await this.taskRepository.findByTaskId(taskId);
  }
}
