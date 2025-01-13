const Country = require('../models/country');

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new country
const createCountry = async (req, res) => {
  const { name } = req.body;

  try {
    const newCountry = await Country.create({
      name
    });
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a country by ID
const getCountryById = async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Country.findByPk(id);
    if (country) {
      res.status(200).json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a country by ID
const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const country = await Country.findByPk(id);
    if (country) {
      country.name = name || country.name;

      await country.save();
      res.status(200).json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a country by ID
const deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const country = await Country.findByPk(id);
    if (country) {
      await country.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCountries,
  createCountry,
  getCountryById,
  updateCountry,
  deleteCountry
};