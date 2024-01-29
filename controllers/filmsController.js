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
        const {rows} = await pool.query(`SELECT * FROM films WHERE id=${id}`);
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