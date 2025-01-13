const express = require('express');
const router = express.Router();
const changeHistoryController = require('../controllers/changeHistoryControllers');

// Endpoint to get all change histories
router.get('/', changeHistoryController.getAllChangeHistories);

// Endpoint to create a new change history
router.post('/', changeHistoryController.createChangeHistory);

// Endpoint to get a change history by ID
router.get('/:id', changeHistoryController.getChangeHistoryById);

// Endpoint to update a change history        
router.put('/:id', changeHistoryController.updateChangeHistory);

// Endpoint to delete a change history
router.delete('/:id', changeHistoryController.deleteChangeHistory);

module.exports = router;