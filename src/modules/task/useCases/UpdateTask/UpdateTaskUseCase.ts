import { ITask, IUpdateTaskDTO } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string, data: IUpdateTaskDTO): Promise<ITask> {
    return await this.taskRepository.update(taskId, data);
  }
}
