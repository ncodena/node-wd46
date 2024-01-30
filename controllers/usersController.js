import { pool } from "../db/pool.js";
import { body, validationResult } from 'express-validator';

export const userValidation = [
    body('first_name').isString().notEmpty(),
    body('last_name').isString().notEmpty(),
    body('age').isInt({ min: 1 }),
];


export const getUsers = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users');
        res.json(rows)
    } catch(err){
        res.sendStatus(500)
    }
    
}

export const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
        if(rows.length === 0){
            res.sendStatus(404)
        } else {
            res.json(rows[0])
        }
    } catch(err){
        res.sendStatus(500)
    }
}

export const postUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {first_name, last_name, age} = req.body;
        const {rows} = await pool.query('INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *', [first_name, last_name, age]);
        res.status(201).json(rows[0])
    } catch(err){
        res.sendStatus(500)
    }
}

export const modifyUser = async (req, res) => {
    const {id} = req.params;

     try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, last_name, age, active } = req.body;
        const query = 'UPDATE users SET first_name = $1, last_name = $2, age = $3, active = $4 WHERE id = $5 RETURNING *;';
        const values = [first_name, last_name, age, active, id];
        const {rows} = await pool.query(query, values);
        console.log(rows, 'rows')
        res.json(rows[0]);
     } catch(err){
        console.log(err)
        res.sendStatus(500)
     }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

     try {
         const {rows} = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
         res.status(200).json(rows[0])
     } catch(err){
         res.sendStatus(500)
     }
}

// EXTRA

//GET /:id/orders: To get all orders linked to a specific user
export const getOrdersFromUser = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM orders WHERE user_id=$1;', [id]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//PUT /:id/check-inactive: If a user has never ordered, he should be set as inactive
export const setUserInactive = async (req, res) => {
    const { id } = req.params;
    
    try {
        const orders = await pool.query('SELECT * FROM orders WHERE user_id=$1;', [id]);
        if (orders.rows.length === 0) {
            const { rows } = await pool.query('UPDATE users SET active=false WHERE id=$1 RETURNING *;', [id]);
            res.json(rows[0]);
        } else {
            res.status(400).json({ message: "User has orders, cannot set to inactive" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

