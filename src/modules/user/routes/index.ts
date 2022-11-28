import { Router } from 'express';
import { authenticateUser } from '../middlewares/authenticateUser';
import { CreateUserController } from '../useCases/CreateUser/CreateUserController';
import { UpdateUserController } from '../useCases/UpdateUser/UpdateUserController';
import { upload } from '../../../config/upload';
import { prisma } from '../../../services/prismaClient';
import { FindUserDataController } from '../useCases/FindUserData/FindUserController';

export const userRoutes = Router();

userRoutes.get('/', async (req, res) => {
	const users = await prisma.user.findMany();
	return res.json({ users });
});

const createUserController = new CreateUserController();
userRoutes.post('/', upload.single('image'), createUserController.handle);

const userDataController = new FindUserDataController();
userRoutes.get('/me', authenticateUser, userDataController.handle);

const updateUserController = new UpdateUserController();
userRoutes.patch(
	'/',
	upload.single('image'),
	authenticateUser,
	updateUserController.handle,
);
