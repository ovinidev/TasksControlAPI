import { Router } from 'express';
import { taskRoutes } from '../modules/task/routes';
import { userRoutes } from '../modules/user/routes';
import { LoginUserController } from '../modules/user/useCases/LoginUser/LoginUserController';
import { RefreshTokenController } from '../modules/user/useCases/RefreshToken/RefreshTokenController';

export const routes = Router();

routes.use('/users', userRoutes);
routes.use('/tasks', taskRoutes);

const loginUserController = new LoginUserController();
routes.post('/login', loginUserController.handle);

const refreshTokenController = new RefreshTokenController();
routes.get('/refresh-token', refreshTokenController.handle);
