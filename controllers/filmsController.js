import { pool } from "../db/pool.js";

export const getFilms = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM films');
        res.json(rows)
    } catch(err){
        res.sendStatus(500)
    }
    
}

export const getFilm = async (req, res) => {
    const {id} = req.params;
    try {
        const {rows} = await pool.query('SELECT * FROM films WHERE id=$1', [id]);
        if(rows.length === 0){
            res.sendStatus(404)
        } else {
            res.json(rows[0])
        }
        console.log(rows)
        //res.json(rows)
    } catch(err){
        res.sendStatus(500)
    }
}

export const postFilm = async (req, res) => {
   console.log('here')
   console.log(req.body)
    try {
        
        const {name, year, genre} = req.body;
        console.log(name, year, genre)
        const {rows} = await pool.query('INSERT INTO films (name, year, genre) VALUES ($1, $2, $3) RETURNING *', [name, year, genre]);
        console.log(rows)
        res.status(201).json(rows[0])
    } catch(err){
        res.sendStatus(500)
    }
}

export const modifyFilm = async (req, res) => {
    const {id} = req.params;

     try {
         const {genre} = req.body;
         const {rows} = await pool.query('UPDATE films SET genre=$1 WHERE id=$2 RETURNING *', [genre, id]);
         res.status(200).json(rows[0])
     } catch(err){
         res.sendStatus(500)
     }
 }

 export const deleteFilm = async (req, res) => {
    const {id} = req.params;

     try {
         const {rows} = await pool.query('DELETE FROM films WHERE id=$1 RETURNING *', [id]);
         res.status(200).json(rows[0])
     } catch(err){
         res.sendStatus(500)
     }
 }