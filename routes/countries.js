import express from 'express';
import { getCountries, getCountry, postCountry, deleteCountry, modifyCountry } from '../controllers/countriesController.js';
import { checkCountryExistance } from '../middlewares/countries.js';
import { authMiddleware } from '../middlewares/users.js';
const countriesRouter = express.Router();

countriesRouter.get('/', authMiddleware, getCountries);
countriesRouter.get('/:code', checkCountryExistance, getCountry);
countriesRouter.post('/', checkCountryExistance,  postCountry);
countriesRouter.put('/:code', checkCountryExistance, modifyCountry);
countriesRouter.delete('/:code', checkCountryExistance, deleteCountry);

export default countriesRouter;
