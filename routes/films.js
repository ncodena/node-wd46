import express from 'express';
import { getFilms, getFilm, postFilm, modifyFilm, deleteFilm } from '../controllers/filmsController.js';
import { authMiddleware } from '../middlewares/users.js';

const filmsRouter = express.Router();


filmsRouter.get('/', authMiddleware, getFilms);
filmsRouter.get('/:id', getFilm);
filmsRouter.post('/', postFilm);
filmsRouter.put('/:id', modifyFilm);
filmsRouter.delete('/:id', deleteFilm);

export default filmsRouter;

