const express = require('express');
const UserController = require("../controllers/user.controller")

const router = express.Router();

// User registration
router.post('/register', UserController.register);

// User login
router.post('/login', UserController.login);

// Get user profile (protected route)
router.get('/profile', UserController.getProfile);

// Update user profile (protected route)
router.put('/profile/update', UserController.updateProfile);

// Logout user
router.post('/logout', UserController.logout);

module.exports = router;