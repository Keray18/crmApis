const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const existingUser = await User.findByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }

};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findByEmail(email);
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
        
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const user = await User.getAll();
        if(!user) return res.status(404).json({ message: 'No users found' });

        res.status(200).json({ message: 'Users fetched successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers
}