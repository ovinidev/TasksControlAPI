import { ITaskRepository } from '../../repository/ITaskRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DeleteTaskUseCase {
	constructor(
		@inject('TaskRepository')
		private taskRepository: ITaskRepository,
	) {}

	async execute(taskId: string): Promise<void> {
		await this.taskRepository.delete(taskId);
	}
}
