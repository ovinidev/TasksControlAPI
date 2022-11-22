import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ICreateTaskDTO } from '../../interfaces/ITask';
import { ITaskRepository } from '../../repository/ITaskRepository';

@injectable()
export class CreateTaskUseCase {
	constructor(
		@inject('TaskRepository')
		private taskRepository: ITaskRepository,
	) {}

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
