import { ICreateTaskDTO, ITask, IUpdateTaskDTO } from '../interfaces/ITask';

export interface ITaskRepository {
  create(data: ICreateTaskDTO): Promise<ITask>;
  findAll(): Promise<ITask[]>;
  findByUserId(id: string, order?: 'desc' | 'asc'): Promise<ITask[] | null>;
  findByTaskId(id: string): Promise<ITask | null>;
  update(taskId: string, data: IUpdateTaskDTO): Promise<void>;
  delete(taskId: string): Promise<void>;
}
