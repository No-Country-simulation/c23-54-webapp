const ChangeHistory = require('../models/changeHistory');

// Get all change histories
const getAllChangeHistories = async (req, res) => {
  try {
    const changeHistories = await ChangeHistory.findAll();
    res.status(200).json(changeHistories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new change history
const createChangeHistory = async (req, res) => {
  const { ID_user, ID_entity, ID_action, change_date, details } = req.body;

  try {
    const newChangeHistory = await ChangeHistory.create({
      ID_user,
      ID_entity,
      ID_action,
      change_date,
      details
    });
    res.status(201).json(newChangeHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a change history by ID
const getChangeHistoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const changeHistory = await ChangeHistory.findByPk(id);
    if (changeHistory) {
      res.status(200).json(changeHistory);
    } else {
      res.status(404).json({ message: 'Change history not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a change history by ID
const updateChangeHistory = async (req, res) => {
  const { id } = req.params;
  const { ID_user, ID_entity, ID_action, change_date, details } = req.body;

  try {
    const changeHistory = await ChangeHistory.findByPk(id);
    if (changeHistory) {
      changeHistory.ID_user = ID_user || changeHistory.ID_user;
      changeHistory.ID_entity = ID_entity || changeHistory.ID_entity;
      changeHistory.ID_action = ID_action || changeHistory.ID_action;
      changeHistory.change_date = change_date || changeHistory.change_date;
      changeHistory.details = details || changeHistory.details;

      await changeHistory.save();
      res.status(200).json(changeHistory);
    } else {
      res.status(404).json({ message: 'Change history not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a change history by ID
const deleteChangeHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const changeHistory = await ChangeHistory.findByPk(id);
    if (changeHistory) {
      await changeHistory.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Change history not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllChangeHistories,
  createChangeHistory,
  getChangeHistoryById,
  updateChangeHistory,
  deleteChangeHistory
};