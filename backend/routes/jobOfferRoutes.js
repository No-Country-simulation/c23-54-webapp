const express = require('express');
const router = express.Router();
const jobOfferController = require('../controllers/jobOfferControllers');

// Endpoint to get all job offers
router.get('/', jobOfferController.getAllJobOffers);

// Endpoint to create a new job offer
router.post('/', jobOfferController.createJobOffer);

// Endpoint to get a job offer by ID
router.get('/:id', jobOfferController.getJobOfferById);

// Endpoint to update a job offer
router.put('/:id', jobOfferController.updateJobOffer);

// Endpoint to delete a job offer
router.delete('/:id', jobOfferController.deleteJobOffer);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

module.exports = router;