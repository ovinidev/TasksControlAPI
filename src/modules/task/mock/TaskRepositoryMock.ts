import { ICreateTaskDTO, ITask, IUpdateTaskDTO } from '../interfaces/ITask';
import { ITaskRepository } from '../repository/ITaskRepository';

export class TaskRepositoryMock implements ITaskRepository {
  tasks: ITask[] = [];

  async create(data: ICreateTaskDTO): Promise<ITask> {
    const task = {
      id: Math.random().toString(36),
      name: data.name,
      date: data.date,
      description: data.description,
      hours: data.hours,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
    } as ITask;

    this.tasks.push(task);

    return task;
  }

  async findAll(): Promise<ITask[]> {
    return this.tasks;
  }

  async findByUserId(id: string): Promise<ITask[] | null> {
    const tasks = this.tasks.filter((task) => {
      return task.userId === id;
    });

    return tasks ? tasks : null;
  }

  async update(taskId: string, data: IUpdateTaskDTO): Promise<void> {
    console.log('oi');
  }

  async findByTaskId(taskId: string): Promise<ITask | null> {
    const task = this.tasks.find((task) => {
      return task.id === taskId;
    });

    return task ? task : null;
  }

  async delete(taskId: string): Promise<void> {
    const tasks = this.tasks.filter((task) => {
      return task.id !== taskId;
    });

    this.tasks = tasks;
  }
}
