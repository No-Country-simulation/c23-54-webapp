const Modality = require('../models/modality');

// Get all modalities
const getAllModalities = async (req, res) => {
  try {
    const modalities = await Modality.findAll();
    res.status(200).json(modalities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new modality
const createModality = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newModality = await Modality.create({
      name,
      description
    });
    res.status(201).json(newModality);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a modality by ID
const getModalityById = async (req, res) => {
  const { id } = req.params;

  try {
    const modality = await Modality.findByPk(id);
    if (modality) {
      res.status(200).json(modality);
    } else {
      res.status(404).json({ message: 'Modality not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a modality by ID
const updateModality = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const modality = await Modality.findByPk(id);
    if (modality) {
      modality.name = name || modality.name;
      modality.description = description || modality.description;

      await modality.save();
      res.status(200).json(modality);
    } else {
      res.status(404).json({ message: 'Modality not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a modality by ID
const deleteModality = async (req, res) => {
  const { id } = req.params;

  try {
    const modality = await Modality.findByPk(id);
    if (modality) {
      await modality.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Modality not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllModalities,
  createModality,
  getModalityById,
  updateModality,
  deleteModality
};