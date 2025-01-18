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
  const { name_action, description_action } = req.body;

  try {
    const newAction = await Action.create({
      name_action,
      description_action,
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
  const { name_action, description_action } = req.body;

  try {
    const action = await Action.findByPk(id);
    if (action) {
      action.action_name = name_action || action.name_action;
      action.description = description_action || action.description_action;
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
