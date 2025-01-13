const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationControllers');

// Endpoint to get all job applications
router.get('/', jobApplicationController.getAllJobApplications);

// Endpoint to create a new job application
router.post('/', jobApplicationController.createJobApplication);

// Endpoint to get a job application by ID
router.get('/:id', jobApplicationController.getJobApplicationById);

// Endpoint to update a job application
router.put('/:id', jobApplicationController.updateJobApplication);

// Endpoint to delete a job application
router.delete('/:id', jobApplicationController.deleteJobApplication);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

module.exports = router;