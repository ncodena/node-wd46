import express from 'express';
import { getUsers, getUser, postUser, modifyUser, deleteUser, getOrdersFromUser, setUserInactive, userValidation } from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', userValidation, postUser);
usersRouter.put('/:id', userValidation, modifyUser);
usersRouter.delete('/:id', deleteUser);

usersRouter.get('/:id/orders', getOrdersFromUser);
usersRouter.put('/:id/check-inactive', setUserInactive)

export default usersRouter;

