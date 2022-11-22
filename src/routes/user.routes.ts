import { Router } from 'express';
import { prisma } from '../services/prismaClient';
import { authenticateUser } from '../modules/user/middlewares/authenticateUser';
import createUserController from '../modules/user/useCases/CreateUser';
import updateUserController from '../modules/user/useCases/UpdateUser';
import { upload } from '../config/upload';
import { verifyUserBodyIsValid } from '../modules/user/middlewares/verifyUserBodyIsValid';

export const userRoutes = Router();

userRoutes.get('/', async (req, res) => {
	const users = await prisma.user.findMany();
	return res.json({ users });
});

userRoutes.post(
	'/',
	upload.single('image'),
	verifyUserBodyIsValid,
	(req, res) => {
		return createUserController().handle(req, res);
	},
);

userRoutes.patch('/', upload.single('image'), authenticateUser, (req, res) => {
	return updateUserController().handle(req, res);
});
