const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoleControllers');

// Endpoint to get all user roles
router.get('/', userRoleController.getAllUserRoles);

// Endpoint to create a new user role
router.post('/', userRoleController.createUserRole);

// Endpoint to get a user role by ID
router.get('/:id', userRoleController.getUserRoleById);

// Endpoint to update a user role
router.put('/:id', userRoleController.updateUserRole);

// Endpoint to delete a user role
router.delete('/:id', userRoleController.deleteUserRole);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

module.exports = router;