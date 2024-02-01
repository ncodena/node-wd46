import { pool } from "../db/pool.js";
import { validationResult } from 'express-validator';

export const getUsers = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM users');
        res.json(rows)
    } catch(err){
        res.sendStatus(500)
    }
    
}

export const getUser = (req, res) => {
    res.json(req.user)
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

//Old modifyUser controller function

// export const modifyUser = async (req, res) => {
//     const {id} = req.params;

//      try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const { first_name, last_name, age, active } = req.body;
//         const query = `UPDATE users SET first_name = $1, last_name = $2, age = $3, active = $4 WHERE id = $5 RETURNING *`;
//         const values = [first_name, last_name, age, active, id];
//         const {rows} = await pool.query(query, values);
//         if(rows.length === 0){
//             res.sendStatus(404)
//         } else {
//             res.json(rows[0]);
//         }
//      } catch(err){
//         res.sendStatus(500)
//      }
// }

export const modifyUserPartially = async (req, res, next) => {
    const {id} = req.params;

     try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { first_name, last_name, age, active } = req.body;
        //Initialize array to store query parts
        const updateFields = [];
        //Initialize array to store parameter values
        const values = [];
        //Example static
        // if (last_name !== undefined) {
        //     updateFields.push('last_name = $2');
        //     values.push(last_name);
        // }

        if (first_name !== undefined) {
            updateFields.push(`first_name = $${updateFields.length + 1}`);
            values.push(first_name);
        }
        if (last_name !== undefined) {
            updateFields.push(`last_name = $${updateFields.length + 1}`);
            values.push(last_name);
        }
        if (age !== undefined) {
            updateFields.push(`age = $${updateFields.length + 1}`);
            values.push(age);
        }
        if (active !== undefined) {
            updateFields.push(`active = $${updateFields.length + 1}`);
            values.push(active);
        }

        //Adding id into array of parameterized values
        values.push(id);
        // if all the required fields are missing, throw 400 error
        if(!first_name && !last_name && !age && active === undefined) {
            // return res.sendStatus(400)
            return next({statusCode: 400, message: "Bad request"});
        }

        const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = $${values.length} RETURNING *;`;

        const { rows } = await pool.query(query, values);

        return res.json(rows[0]);
        
        
     } catch(err){
        next(err)
     }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;

     try {
        const {rows} = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
        return res.status(200).json(rows[0])
     } catch(err){
        res.sendStatus(500)
     }
}

//Create a token for a specific user
export const createToken = async (req, res) => {
    try {
        const {id} = req.params;
        const {token} = req.body;
    
        //insert token into db
        const {rows} = await pool.query('INSERT INTO tokens (value) VALUES ($1) RETURNING id', [token]);
    
        //update user's token_id column in the users table
        await pool.query('UPDATE users SET token_id = $1 WHERE id= $2', [rows[0].id, id]);
    
        res.json({tokenId: rows[0].id })
    } catch(err){
        res.sendStatus(500)

    }
}

export const tokenHandler = async (req, res) => {
    res.sendStatus(200)
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

