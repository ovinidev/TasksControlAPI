import 'reflect-metadata';
import { ITask, IUpdateTaskDTO } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateTaskUseCase {
	constructor(
		@inject('TaskRepository')
		private taskRepository: ITaskRepository,
	) {}

	async execute(taskId: string, data: IUpdateTaskDTO): Promise<ITask> {
		return await this.taskRepository.update(taskId, data);
	}
}
