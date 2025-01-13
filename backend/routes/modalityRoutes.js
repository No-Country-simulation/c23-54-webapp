const express = require('express');
const router = express.Router();
const modalityController = require('../controllers/modalityControllers');

// Endpoint to get all modalities
router.get('/', modalityController.getAllModalities);

// Endpoint to create a new modality
router.post('/', modalityController.createModality);

// Endpoint to get a modality by ID
router.get('/:id', modalityController.getModalityById);

// Endpoint to update a modality
router.put('/:id', modalityController.updateModality);

// Endpoint to delete a modality        
router.delete('/:id', modalityController.deleteModality);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

module.exports = router;