const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new admin
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = new User({ username, password, role: 'admin' });
    await admin.save();
    res.status(201).send(admin);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ _id: admin._id, role: admin.role }, 'secretKey');
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// View assignments tagged to the admin
router.get('/assignments', async (req, res) => {
  try {
    const { adminId } = req.query;
    const assignments = await Assignment.find({ admin: adminId });
    res.send(assignments);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Accept a assignment
router.post('/assignments/:id/accept', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    assignment.status = 'accepted';
    await assignment.save();
    res.send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Reject a assignment
router.post('/assignments/:id/reject', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    assignment.status = 'rejected';
    await assignment.save();
    res.send(assignment);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
