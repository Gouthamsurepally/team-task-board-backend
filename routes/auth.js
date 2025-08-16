const express = require('express');
const { register, login, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get all users (protected)
router.get('/users', protect, getUsers);

module.exports = router;