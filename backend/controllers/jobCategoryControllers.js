const JobCategory = require('../models/jobCategory');

// Get all job categories
const getAllJobCategories = async (req, res) => {
  try {
    const jobCategories = await JobCategory.findAll();
    res.status(200).json(jobCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new job category
const createJobCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const newJobCategory = await JobCategory.create({
      name
    });
    res.status(201).json(newJobCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a job category by ID
const getJobCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const jobCategory = await JobCategory.findByPk(id);
    if (jobCategory) {
      res.status(200).json(jobCategory);
    } else {
      res.status(404).json({ message: 'Job category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job category by ID
const updateJobCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const jobCategory = await JobCategory.findByPk(id);
    if (jobCategory) {
      jobCategory.name = name || jobCategory.name;

      await jobCategory.save();
      res.status(200).json(jobCategory);
    } else {
      res.status(404).json({ message: 'Job category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job category by ID
const deleteJobCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const jobCategory = await JobCategory.findByPk(id);
    if (jobCategory) {
      await jobCategory.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Job category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobCategories,
  createJobCategory,
  getJobCategoryById,
  updateJobCategory,
  deleteJobCategory
};