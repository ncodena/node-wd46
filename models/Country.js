import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    alpha2Code: {
        required: true,
        type: String,
        match: [/^[A-Z]{2}$/, 'Please fill a valid alpha3Code']
    },
    alpha3Code: {
        required: true,
        type: String,
        match: [/^[A-Z]{3}$/, 'Please fill a valid alpha3Code']
    },
    visited: { 
        type: Boolean, 
        default: false
    } 
});

const Country = mongoose.model('Country', CountrySchema)

export default Country;