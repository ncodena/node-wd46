import User from "../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
    
}

export const getUser = async (req, res) => {
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

export const postUser = async (req, res) => {
    const { name, first_name, email } = req.body;
    try {
      const user = await User.create({ name, first_name, email });
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

export const modifyMultipleUsers = async (req, res) => {
    try {
        const result = await User.updateMany({ name: "John" }, { name: "Bob" });
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
 }

