import express from 'express';
import { getUsers, registerUser, modifyMultipleUsers, loginUser, getUser } from '../controllers/usersController.js';
import { authMiddleware } from '../middlewares/users.js';

const usersRouter = express.Router();


usersRouter.get('/', getUsers);
usersRouter.post('/login', loginUser);
usersRouter.get('/user', authMiddleware, getUser);
usersRouter.post('/', registerUser);
usersRouter.put('/', modifyMultipleUsers);

export default usersRouter;

