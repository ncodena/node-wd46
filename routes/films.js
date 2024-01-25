import express from 'express';
import { getFilms, getFilm } from '../controllers/filmsController.js';


const filmsRouter = express.Router();


filmsRouter.get('/', getFilms);
filmsRouter.get('/:id', getFilm);

export default filmsRouter;

