const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Endpoint to get all users
router.get('/', userController.getAllUsers);

// Endpoint to create a new user
router.post('/', userController.createUser);

// Endpoint to get a user by ID
router.get('/:id', userController.getUserById);

// Endpoint to update a user
router.put('/:id', userController.updateUser);

// Endpoint to delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
