const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).send({ message: 'Username already exists' });
    }
    res.status(400).send(error);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
   if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, 'secretKey');
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Upload a assignment
router.post('/upload', async (req, res) => {
  try {
    const { userId, task, admin } = req.body;
    const assignment = new Assignment({ userId, task, admin });
    await assignment.save();
    res.status(201).send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Fetch all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' });
    res.send(admins);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
