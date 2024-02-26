import mongoose from 'mongoose';

const FilmSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    year: {
        required: true,
        type: Number
    },
    genre: {
        required: true,
        type: String
    },
    img: {
        type: String,
        required: true
    }
});

const Film = mongoose.model('Film', FilmSchema)

export default Film;