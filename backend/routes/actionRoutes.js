const express = require('express');
const router = express.Router();
const ActionController = require('../controllers/actionControllers');

// Endpoint to get all Actions
router.get('/', ActionController.getAllActions);

// Endpoint to create a new Action
router.post('/', ActionController.createAction);

// Endpoint to get an Action by ID
router.get('/:id', ActionController.getActionById);

// Endpoint to update an Action
router.put('/:id', ActionController.updateAction);

// Endpoint to delete an Action
router.delete('/:id', ActionController.deleteAction);

module.exports = router;
