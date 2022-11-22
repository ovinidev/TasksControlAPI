import { container } from 'tsyringe';
import { ITaskRepository } from '../../modules/task/repository/ITaskRepository';
import { TaskRepository } from '../../modules/task/repository/TaskRepository';
import { IUserRepository } from '../../modules/user/repository/IUserRepository';
import { UserRepository } from '../../modules/user/repository/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
