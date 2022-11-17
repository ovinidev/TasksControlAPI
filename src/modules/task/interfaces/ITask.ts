export interface ICreateTaskDTO {
  name: string;
  description: string;
  hours: number;
  date: string;
  userId: string;
}

export interface IUpdateTaskDTO {
  name?: string;
  description?: string;
  hours?: number;
  date?: string;
  userId?: string;
}

export interface ITask {
  id: string;
  name: string;
  description: string;
  hours: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
}
