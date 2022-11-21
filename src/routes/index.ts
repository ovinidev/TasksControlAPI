import { Router } from 'express';
import { LoginRouter } from './login.routes';
import { taskRoutes } from './task.routes';
import { userRoutes } from './user.routes';

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);
routes.use('/login', LoginRouter);
