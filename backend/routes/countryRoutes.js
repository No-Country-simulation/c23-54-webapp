const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryControllers');

// Endpoint to get all countries
router.get('/', countryController.getAllCountries);

// Endpoint to create a new country
router.post('/', countryController.createCountry);

// Endpoint to get a country by ID
router.get('/:id', countryController.getCountryById);

// Endpoint to update a country
router.put('/:id', countryController.updateCountry);

// Endpoint to delete a country
router.delete('/:id', countryController.deleteCountry); 

module.exports = router;