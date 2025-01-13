const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityControllers');

// Endpoint to get all cities                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
router.get('/', cityController.getAllCities);           

// Endpoint to create a new city       
router.post('/', cityController.createCity);           

// Endpoint to get a city by ID
router.get('/:id', cityController.getCityById);       

// Endpoint to update a city
router.put('/:id', cityController.updateCity);        

// Endpoint to delete a city        
router.delete('/:id', cityController.deleteCity);     

module.exports = router;