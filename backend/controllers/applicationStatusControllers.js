const ApplicationStatus = require('../models/applicationStatus');

// Get all application statuses
const getAllApplicationStatuses = async (req, res) => {
  try {
    const applicationStatuses = await ApplicationStatus.findAll();
    res.status(200).json(applicationStatuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new application status
const createApplicationStatus = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newApplicationStatus = await ApplicationStatus.create({
      name,
      description
    });
    res.status(201).json(newApplicationStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an application status by ID
const getApplicationStatusById = async (req, res) => {
  const { id } = req.params;

  try {
    const applicationStatus = await ApplicationStatus.findByPk(id);
    if (applicationStatus) {
      res.status(200).json(applicationStatus);
    } else {
      res.status(404).json({ message: 'Application status not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an application status by ID
const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const applicationStatus = await ApplicationStatus.findByPk(id);
    if (applicationStatus) {
      applicationStatus.name = name || applicationStatus.name;
      applicationStatus.description = description || applicationStatus.description;

      await applicationStatus.save();
      res.status(200).json(applicationStatus);
    } else {
      res.status(404).json({ message: 'Application status not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an application status by ID
const deleteApplicationStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const applicationStatus = await ApplicationStatus.findByPk(id);
    if (applicationStatus) {
      await applicationStatus.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Application status not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllApplicationStatuses,
  createApplicationStatus,
  getApplicationStatusById,
  updateApplicationStatus,
  deleteApplicationStatus
};