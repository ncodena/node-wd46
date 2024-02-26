
import cloudinary from "../db/configCloudinary.js";
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

        let imageUrl = '';

        // If there's an uploaded file, upload it to Cloudinary via upload_stream method
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    //Specify the folder in Cloudinary to store the image. In my case, I call it films since all images stored are gonna be related to this topic
                    folder: "films"
                }, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
                // The file's data is sent to Cloudinary. req.file.buffer will contain the file's data as a binary buffer, which is what you're uploading. 
                //The .end() method on the upload stream is used to write this buffer to the stream, initiating the upload process.
                uploadStream.end(req.file.buffer);
            });
            // Once the promise resolves, the result object contains details about the uploaded file, including its URL on Cloudinary's servers. After the upload is successful, we store the image URL returned by Cloudinary
            imageUrl = result.url; 
        }
        const data = await Film.create({name, year, genre, img: imageUrl})
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