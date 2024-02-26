import express from 'express';
import { getFilms, getFilm, postFilm, modifyFilm, deleteFilm } from '../controllers/filmsController.js';
import { authMiddleware } from '../middlewares/users.js';
import { upload } from '../middlewares/films.js';


const filmsRouter = express.Router();


filmsRouter.get('/', authMiddleware, getFilms);
filmsRouter.get('/:id', getFilm);
//This multer middleware is used to handle single file uploads, where 'img' corresponds to the name of the form field in the request.
filmsRouter.post('/', upload.single('img'), postFilm);
filmsRouter.put('/:id', modifyFilm);
filmsRouter.delete('/:id', deleteFilm);

export default filmsRouter;

