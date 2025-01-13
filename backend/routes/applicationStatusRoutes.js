
const express = require('express');
const router = express.Router();
const applicationStatusController = require('../controllers/applicationStatusControllers');

// Endpoint to get all application statuses
router.get('/', applicationStatusController.getAllApplicationStatuses);

// Endpoint to create a new application status
router.post('/', applicationStatusController.createApplicationStatus);

// Endpoint to get an application status by ID
router.get('/:id', applicationStatusController.getApplicationStatusById);

// Endpoint to update an application status
router.put('/:id', applicationStatusController.updateApplicationStatus);

// Endpoint to delete an application status
router.delete('/:id', applicationStatusController.deleteApplicationStatus);

module.exports = router;