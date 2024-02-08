
import Film from "../models/Film.js";

export const getFilms = async (req, res) => {
    try {
        const data = await Film.find();
        res.json(data)
    } catch(err){
        res.sendStatus(500)
    }
    
}

export const getFilm = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await Film.findById(id);
        if(!data){
            res.sendStatus(404)
        } else {
            res.json(data)
        }
    } catch(err){
        res.sendStatus(500)
    }
}

export const postFilm = async (req, res) => {
    try {
        
        const {name, year, genre} = req.body;
        console.log(name, year, genre)
        const data = await Film.create({name, year, genre})
        res.status(201).json(data)
    } catch(err){
        res.sendStatus(500)
    }
}

export const modifyFilm = async (req, res) => {
    const {id} = req.params;

     try {
         const {name, genre, year} = req.body;

         let update = {};

         if(name !== undefined) update.name = name;
         if(genre !== undefined) update.genre = genre;
         if(year !== undefined) update.year = year;
         
         const data = await Film.findByIdAndUpdate(id, update, {new: true})
         res.status(200).json(data)
     } catch(err){
         res.sendStatus(500)
     }
 }

 export const deleteFilm = async (req, res) => {
    const {id} = req.params;

     try {
         const data = await Film.findByIdAndDelete(id)
         res.status(200).json(data)
     } catch(err){
         res.sendStatus(500)
     }
 }