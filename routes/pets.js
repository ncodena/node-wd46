import express from 'express';
import { getPetsType, getPetsName } from '../controllers/petsController.js';


const petsRouter = express.Router();


petsRouter.get('/:pet_type', getPetsType);
petsRouter.get('/:pet_type/:pet_id', getPetsName);

export default petsRouter;

