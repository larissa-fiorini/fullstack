const User = require('../models/User')

exports.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users);
};

exports.createUser = async (req,res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
};