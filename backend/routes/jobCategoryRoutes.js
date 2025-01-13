const express = require('express');
const router = express.Router();
const jobCategoryController = require('../controllers/jobCategoryControllers');

// Endpoint to get all job categories
router.get('/', jobCategoryController.getAllJobCategories);

// Endpoint to create a new job category
router.post('/', jobCategoryController.createJobCategory);

// Endpoint to get a job category by ID
router.get('/:id', jobCategoryController.getJobCategoryById);

// Endpoint to update a job category
router.put('/:id', jobCategoryController.updateJobCategory);

// Endpoint to delete a job category
router.delete('/:id', jobCategoryController.deleteJobCategory);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

module.exports = router;    