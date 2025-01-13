const Action = require('../models/action');

// Get all actions
const getAllActions = async (req, res) => {
  try {
    const actions = await Action.findAll();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new action
const createAction = async (req, res) => {
  const { name, description, start_date, end_date, status, userId, cityId } = req.body;

  try {
    const newAction = await Action.create({
      name,
      description,
      start_date,
      end_date,
      status,
      userId,
      cityId
    });
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an action by ID
const getActionById = async (req, res) => {
  const { id } = req.params;

  try {
    const action = await Action.findByPk(id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an action by ID
const updateAction = async (req, res) => {
  const { id } = req.params;
  const { name, description, start_date, end_date, status, userId, cityId } = req.body;

  try {
    const action = await Action.findByPk(id);
    if (action) {
      action.name = name || action.name;
      action.description = description || action.description;
      action.start_date = start_date || action.start_date;
      action.end_date = end_date || action.end_date;
      action.status = status || action.status;
      action.userId = userId || action.userId;
      action.cityId = cityId || action.cityId;

      await action.save();
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an action by ID
const deleteAction = async (req, res) => {
  const { id } = req.params;

  try {
    const action = await Action.findByPk(id);
    if (action) {
      await action.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllActions,
  createAction,
  getActionById,
  updateAction,
  deleteAction
};
