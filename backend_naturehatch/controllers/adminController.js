const {Admin} = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;


        if (!username || !password) {
            return res.status(400).json({ msg: "Please provide username and password" });
        }

        const admin = await Admin.findOne({ username });
   
        if (!admin) {
            return res.status(401).json({ msg: " UserName Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ msg: " Password Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'Strict',
        });

        res.status(200).json({ msg: "Login successful", token, admin: { id: admin._id, username: admin.username, role: admin.role } });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports =
    adminLogin;