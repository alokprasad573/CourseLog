const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // Correct usage of uuid

// Render login and signup pages
router.get('/login', (req, res) => res.render('login'));
router.get('/signup', (req, res) => res.render('signup'));

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const id = uuidv4(); // Generate unique ID
    try {
        await User.create({ id, username, password });
        res.redirect('/login');
    } catch (err) {
        res.status(500).render('signup', { error: 'Signup failed. Try again.' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }); // Find by username
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token).redirect('/dashboard');
    } catch (err) {
        res.status(500).render('login', { error: 'Login failed. Try again.' });
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/login');
});

module.exports = router;