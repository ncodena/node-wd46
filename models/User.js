import mongoose from 'mongoose';
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        match: [emailRegex, 'Please fill a valid email address']
    },
    password: {
        required: true,
        type: String
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        //matching the exact model name of your Country schema
        ref: 'Country',
        required: true
    }
});

const User = mongoose.model('User', UserSchema)

export default User;