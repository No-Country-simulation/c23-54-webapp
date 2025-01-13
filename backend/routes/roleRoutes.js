const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleControllers');

// Endpoint to get all roles
router.get('/', roleController.getAllRoles);

// Endpoint to create a new role
router.post('/', roleController.createRole);

// Endpoint to get a role by ID
router.get('/:id', roleController.getRoleById);

// Endpoint to update a role
router.put('/:id', roleController.updateRole);

// Endpoint to delete a role
router.delete('/:id', roleController.deleteRole);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

module.exports = router;