import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/:id', userController.getById);
userRoutes.post('/', userController.create);

export { userRoutes };