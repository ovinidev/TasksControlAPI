import { ITask } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindTaskByTaskIdUseCase {
	constructor(
		@inject('TaskRepository')
		private taskRepository: ITaskRepository,
	) {}

	async execute(taskId: string): Promise<ITask | null> {
		return await this.taskRepository.findByTaskId(taskId);
	}
}
