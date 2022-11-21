import { ITask } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';

export class FindAllTaskUseCase {
	constructor(private taskRepository: ITaskRepository) {}

	async execute(): Promise<ITask[] | null> {
		return await this.taskRepository.findAll();
	}
}
