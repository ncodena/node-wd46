import { pool } from "../db/pool.js";
import {body} from 'express-validator';

export const middlewareExample = (req, res, next) => {
    //Perform soem action on the request or response
    console.log({url: req.originalUrl})
    next();
}

export const authMiddleware = (req, res, next) => {
   const secretToken = process.env.SECRET_TOKEN;
   const {userToken} = req.body;

   if(!userToken || userToken !== secretToken){
        return res.status(401).json({error: 'Unauthorized'})
   } else {
        next();
   }

}

export const checkUser = async (req, res, next) => {
    console.log('getting into middleware')
   //This middleware should check the existence of a target user in the database. 
   //If the user does not exist, return a status code of 404 (not found) back; 
   //if it does exist, attach it to the request (req) object and call next. 

    const {id} = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
        if(rows.length === 0){
            return res.sendStatus(404)
        } else {
            req.user = rows[0]
            next()
        }
    } catch(err){
        return res.sendStatus(500)
    }
}

export const errorHandler = async (err, req, res, next) => {
    //Process error retrieved by route handler or previous middleware and send back error message and status code
    console.log(err)
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({error: message})
}   

 
export const userValidation = [
    body('first_name').isString().notEmpty(),
    body('last_name').isString().notEmpty(),
    body('age').isInt({ min: 1 }).notEmpty(),
];

export const userValidationOptional = [
    body('first_name').optional().isString().notEmpty(),
    body('last_name').optional().isString().notEmpty(),
    body('age').optional().isInt({ min: 1 }),
    body('active').optional().isBoolean(),
];

export const secureMiddleware = async (req, res, next) => {
    // inspect if there is a param with the name token and a value
    const {token} = req.params;
    //If the token has a value and is longer than 3 characters, continue
    if(token && token.length > 3){
        next()
    } else {
        //when the token doesn’t exist and send back a response with the HTTP code 403.  
        res.sendStatus(403)
    }

}  
