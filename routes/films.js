import express from 'express';
import { getFilms, getFilm, postFilm, modifyFilm, deleteFilm } from '../controllers/filmsController.js';


const filmsRouter = express.Router();


filmsRouter.get('/', getFilms);
filmsRouter.get('/:id', getFilm);
filmsRouter.post('/', postFilm);
filmsRouter.put('/:id', modifyFilm);
filmsRouter.delete('/:id', deleteFilm);

export default filmsRouter;

