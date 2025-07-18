const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.getUsers = async (req,res) => {
    const users = await User.find();
    res.json(users);
};

exports.createUser = async (req,res) => {
    const {name, email, password} = req.body;

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = new User({name, email, password: hashedPwd});

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
};

exports.deleteUser = async (req,res) => {
    try{
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json({message: 'User deleted successfully.', user: deletedUser});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server error.'});
    }
}

exports.getUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const findUser = await User.findById(userId);

        if (!findUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User find successfully.', user: findUser});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server error.'});
    }
}

exports.getUserByEmail = async (req, res) => {
    try{
        const userEmail = req.body.email;
        const findUser = await User.findOne({ email: userEmail });

        if (!findUser) {
            return res.status(404).json({message: 'User not found'});
        }
        res.json({message: 'User find successfully.', user: findUser});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server error.'});
    }
}

exports.updateUser = async (req,res) => {
    try {
        const userId = req.params.id;
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({message: 'User not found'});
        }

        res.json({message: 'User updated successfully.', user: updatedUser});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server error.'});
    }
}

