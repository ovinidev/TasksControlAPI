import { ITask } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';

export class FindAllTasksUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(): Promise<ITask[] | null> {
    return await this.taskRepository.findAll();
  }
}
