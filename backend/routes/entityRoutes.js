const express = require('express');
const router = express.Router();
const entityController = require('../controllers/entityControllers');

// Endpoint to get all entities
router.get('/', entityController.getAllEntities);

// Endpoint to create a new entity
router.post('/', entityController.createEntity);

// Endpoint to get an entity by ID
router.get('/:id', entityController.getEntityById);

// Endpoint to update an entity
router.put('/:id', entityController.updateEntity);

// Endpoint to delete an entity
router.delete('/:id', entityController.deleteEntity);

module.exports = router;