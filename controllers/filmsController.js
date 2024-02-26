
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
        let imgBase64 = '';
        //// req.file contains the file uploaded via the form field named 'img'
         // If there's an uploaded file, convert it to base64 string, which is gonna be the value to be stored in db
         //Base64 is a method of encoding binary data (like images) into a string of ASCII characters, which are more universally handled by systems. It's particularly useful for embedding images directly into HTML or CSS files.
         if (req.file) {
            imgBase64 = req.file.buffer.toString('base64');
        }
        const data = await Film.create({name, year, genre, img: imgBase64})
        res.status(201).json(data)
    } catch(err){
        console.log(err)
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