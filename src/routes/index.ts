import { Router } from 'express';
import { userRouter } from './user.routes';

export const routes = Router();

routes.use('/users', userRouter);
