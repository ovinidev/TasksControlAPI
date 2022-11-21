import { Router } from 'express';
import loginUserController from '../modules/user/useCases/LoginUser';

export const LoginRouter = Router();

LoginRouter.post('/', (req, res) => {
	return loginUserController().handle(req, res);
});
