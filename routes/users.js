import express from 'express';
import { getUsers, registerUser, modifyMultipleUsers, loginUser } from '../controllers/usersController.js';


const usersRouter = express.Router();


usersRouter.get('/', getUsers);
usersRouter.get('/login', loginUser);
usersRouter.post('/', registerUser);
usersRouter.put('/', modifyMultipleUsers);

export default usersRouter;

