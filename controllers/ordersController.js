import { pool } from "../db/pool.js";
import { body, validationResult } from 'express-validator';

export const validateCreateOrder = [
    body('price').isFloat({ min: 0.01 }).notEmpty(),
    body('date').isISO8601().toDate(),
    body('user_id').isInt({ min: 1 }),
];

export const getAllOrders = async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM orders');
      res.json(rows);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query('SELECT * FROM orders WHERE id=$1;', [id]);
      if(rows.length === 0){
        res.sendStatus(404)
    } else {
        res.json(rows[0])
    }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
export const createOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { price, date, user_id } = req.body;
    try {
      const { rows } = await pool.query('INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *;', [price, date, user_id]);
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json(err);
    }
};
  
export const updateOrder = async (req, res) => {
    const { price } = req.body;
    const { id } = req.params;
    try {
      const { rows } = await pool.query('UPDATE orders SET price=$1 WHERE id=$2 RETURNING *;', [price, id]);
      res.json(rows[0]);
    } catch (err) {
      res.status(500).json(err);
    }
};
  
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM orders WHERE id=$1;', [id]);
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
};



