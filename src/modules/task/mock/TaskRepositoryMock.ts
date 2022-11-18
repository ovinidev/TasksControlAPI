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

  async update(taskId: string, data: IUpdateTaskDTO): Promise<ITask> {
    let task = this.tasks.find((task) => {
      return task.id === taskId;
    }) as ITask;

    const tasks = this.tasks.filter((task) => {
      return task.id !== taskId;
    });

    this.tasks = tasks;

    task = {
      id: task.id,
      name: data.name ? data.name : task.name,
      date: data.date ? new Date(data.date) : task.date,
      description: data.description ? data.description : task.description,
      hours: data.hours ? data.hours : task.hours,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      userId: task.userId,
    };

    this.tasks.push(task);

    return task;
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
