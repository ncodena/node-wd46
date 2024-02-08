import express from 'express';
import { getUsers, getUser, postUser, modifyMultipleUsers } from '../controllers/usersController.js';


const usersRouter = express.Router();


usersRouter.get('/', getUsers);
usersRouter.get('/:id', getUser);
usersRouter.post('/', postUser);
usersRouter.put('/', modifyMultipleUsers);

export default usersRouter;

