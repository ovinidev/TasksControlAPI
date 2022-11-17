import { Router } from 'express';
import { taskRoutes } from './task.routes';
import { userRouter } from './user.routes';

export const routes = Router();

routes.use('/users', userRouter);
routes.use('/tasks', taskRoutes);
