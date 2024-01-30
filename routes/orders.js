import express from 'express';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder, validateCreateOrder } from '../controllers/ordersController.js';

const ordersRouter = express.Router();

ordersRouter.get('/', getAllOrders);
ordersRouter.get('/:id', getOrderById);
ordersRouter.post('/', validateCreateOrder, createOrder);
ordersRouter.put('/:id', updateOrder);
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;

