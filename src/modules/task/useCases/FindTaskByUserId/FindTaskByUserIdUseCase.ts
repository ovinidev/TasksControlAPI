import { ITask } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindTaskByUserIdUseCase {
	constructor(
		@inject('TaskRepository')
		private taskRepository: ITaskRepository,
	) {}

	async execute(
		userId: string,
		order?: 'desc' | 'asc',
	): Promise<ITask[] | null> {
		return await this.taskRepository.findByUserId(userId, order);
	}
}
