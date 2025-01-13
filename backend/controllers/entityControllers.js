const Entity = require('../models/entity');

// Get all entities
const getAllEntities = async (req, res) => {
  try {
    const entities = await Entity.findAll();
    res.status(200).json(entities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new entity
const createEntity = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newEntity = await Entity.create({
      name,
      description
    });
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an entity by ID
const getEntityById = async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await Entity.findByPk(id);
    if (entity) {
      res.status(200).json(entity);
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an entity by ID
const updateEntity = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const entity = await Entity.findByPk(id);
    if (entity) {
      entity.name = name || entity.name;
      entity.description = description || entity.description;

      await entity.save();
      res.status(200).json(entity);
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an entity by ID
const deleteEntity = async (req, res) => {
  const { id } = req.params;

  try {
    const entity = await Entity.findByPk(id);
    if (entity) {
      await entity.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEntities,
  createEntity,
  getEntityById,
  updateEntity,
  deleteEntity
};  