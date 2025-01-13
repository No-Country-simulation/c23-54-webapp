const City = require('../models/city');

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new city
const createCity = async (req, res) => {
  const { name } = req.body;

  try {
    const newCity = await City.create({
      name
    });
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a city by ID
const getCityById = async (req, res) => {
  const { id } = req.params;

  try {
    const city = await City.findByPk(id);
    if (city) {
      res.status(200).json(city);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a city by ID
const updateCity = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const city = await City.findByPk(id);
    if (city) {
      city.name = name || city.name;

      await city.save();
      res.status(200).json(city);
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a city by ID
const deleteCity = async (req, res) => {
  const { id } = req.params;

  try {
    const city = await City.findByPk(id);
    if (city) {
      await city.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCities,
  createCity,
  getCityById,
  updateCity,
  deleteCity
};  