const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
    const students = await Student.find({ user: req.user.id });
    res.render('dashboard', { students });
});


router.post('/', auth, async (req, res) => {
    const { name, course, age, city } = req.body;
    if (!name || !age) return res.status(400).send('Name and age required');

    await Student.create({ name, course, age, city, user: req.user.id });
    res.redirect('/dashboard');
});


router.get('/edit/:id', auth, async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id, user: req.user.id });
        if (!student) return res.status(404).send('Student not found');
        res.render('editStudent', { student });
    } catch (err) {
        res.status(500).send('Error loading edit form');
    }
});

router.post('/update/:id', auth, async (req, res) => {
    await Student.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body);
    res.redirect('/dashboard');
});


router.post('/delete/:id', auth, async (req, res) => {
    await Student.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.redirect('/dashboard');
});

module.exports = router;