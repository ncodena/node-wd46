import express from 'express';
import { getUsers, getUser, postUser, deleteUser, getOrdersFromUser, setUserInactive, modifyUserPartially } from '../controllers/usersController.js';
import { authMiddleware, checkUser, errorHandler,userValidation, userValidationOptional } from '../middlewares/users.js';
const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', checkUser, getUser);
usersRouter.post('/', userValidation, postUser);
usersRouter.put('/:id', userValidationOptional, checkUser, modifyUserPartially, errorHandler);
usersRouter.delete('/:id', authMiddleware, checkUser, deleteUser);

usersRouter.get('/:id/orders', getOrdersFromUser);
usersRouter.put('/:id/check-inactive', setUserInactive)

export default usersRouter;

