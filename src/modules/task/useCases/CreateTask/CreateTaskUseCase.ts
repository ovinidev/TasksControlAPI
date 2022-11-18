import { ICreateTaskDTO } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(data: ICreateTaskDTO) {
    return await this.taskRepository.create({
      name: data.name,
      description: data.description,
      hours: data.hours,
      userId: data.userId,
      date: data.date,
    });
  }
}
