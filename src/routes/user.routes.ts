import { Router } from 'express';
import { prisma } from '../services/prismaClient';
import { authenticateUser } from '../middlewares/authenticateUser';
import createUserController from '../modules/user/useCases/CreateUser';
import loginUserController from '../modules/user/useCases/LoginUser';
import updateUserController from '../modules/user/useCases/UpdateUser';
import { upload } from '../config/upload';

export const userRouter = Router();

userRouter.post('/', upload.single('image'), (req, res) => {
  return createUserController().handle(req, res);
});

userRouter.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json({ users });
});

userRouter.post('/login', (req, res) => {
  return loginUserController().handle(req, res);
});

userRouter.patch(
  '/:id',
  upload.single('image'),
  authenticateUser,
  (req, res) => {
    return updateUserController().handle(req, res);
  },
);
