import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Code to generate secure secret token value. Once generated print it in console and create an environment variable to retrieve the value when necessary
// import crypto from 'crypto';
// const secretToken = crypto.randomBytes(32).toString('hex');

const secretToken = process.env.SECRET_TOKEN;

const generateToken = (data) => {
    return jwt.sign(data, secretToken, {expiresIn: '1800s'})
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('country');
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

export const getUser = async (req, res) => {
    const {id} = req.user;
    try {
        const data = await User.findById(id);
        if(!data){
            res.sendStatus(404)
        } else {
            res.json(data)
        }
    } catch(err){
        res.sendStatus(500)
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user)
        if(!user){
            return res.status(404).send('User does not exist')
        }

        const validPassword = await bcrypt.compare(password, user.password )

        if(!validPassword) {
            return res.status(400).send('Invalid credentials');
        }

        const token = generateToken({email: user.email, id: user._id })

        res.json({token, user});

    } catch(err){
        res.sendStatus(500)
    }
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export const modifyMultipleUsers = async (req, res) => {
    try {
        const result = await User.updateMany({ name: "John" }, { name: "Bob" });
        if(result.modifiedCount > 0){
            const users = await User.find({name: "Bob"});
            res.json(users);

        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
 }

