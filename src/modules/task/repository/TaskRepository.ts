import { prisma } from '../../../services/prismaClient';
import { ICreateTaskDTO, ITask, IUpdateTaskDTO } from '../interfaces/ITask';
import { ITaskRepository } from './ITaskRepository';

export class TaskRepository implements ITaskRepository {
  async create(data: ICreateTaskDTO): Promise<ITask> {
    return await prisma.task.create({
      data: {
        name: data.name,
        description: data.description,
        hours: data.hours,
        date: data.date,
        userId: data.userId,
      },
    });
  }

  async findAll(): Promise<ITask[]> {
    return await prisma.task.findMany();
  }

  async findByUserId(
    id: string,
    order?: 'asc' | 'desc',
  ): Promise<ITask[] | null> {
    return await prisma.task.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        updatedAt: order,
      },
    });
  }

  async update(taskId: string, data: IUpdateTaskDTO): Promise<void> {
    await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name: data.name,
        description: data.description,
        hours: data.hours,
        date: data.date,
        userId: data.userId,
      },
    });
  }

  async findByTaskId(taskId: string): Promise<ITask | null> {
    return await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
  }

  async delete(taskId: string): Promise<void> {
    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
