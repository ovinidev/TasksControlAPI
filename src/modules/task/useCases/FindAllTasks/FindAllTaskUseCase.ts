import { ITask } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindAllTaskUseCase {
	constructor(
		@inject('TaskRepository')
		private taskRepository: ITaskRepository,
	) {}

	async execute(): Promise<ITask[] | null> {
		return await this.taskRepository.findAll();
	}
}
