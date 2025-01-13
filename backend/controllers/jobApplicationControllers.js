const JobApplication = require('../models/jobApplication');

// Get all job applications
const getAllJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.findAll();
    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new job application
const createJobApplication = async (req, res) => {
  const { ID_user, ID_job_offer, application_date, ID_application_status, comments } = req.body;

  try {
    const newJobApplication = await JobApplication.create({
      ID_user,
      ID_job_offer,
      application_date,
      ID_application_status,
      comments
    });
    res.status(201).json(newJobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a job application by ID
const getJobApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const jobApplication = await JobApplication.findByPk(id);
    if (jobApplication) {
      res.status(200).json(jobApplication);
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job application by ID
const updateJobApplication = async (req, res) => {
  const { id } = req.params;
  const { ID_user, ID_job_offer, application_date, ID_application_status, comments } = req.body;

  try {
    const jobApplication = await JobApplication.findByPk(id);
    if (jobApplication) {
      jobApplication.ID_user = ID_user || jobApplication.ID_user;
      jobApplication.ID_job_offer = ID_job_offer || jobApplication.ID_job_offer;
      jobApplication.application_date = application_date || jobApplication.application_date;
      jobApplication.ID_application_status = ID_application_status || jobApplication.ID_application_status;
      jobApplication.comments = comments || jobApplication.comments;

      await jobApplication.save();
      res.status(200).json(jobApplication);
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job application by ID
const deleteJobApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const jobApplication = await JobApplication.findByPk(id);
    if (jobApplication) {
      await jobApplication.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobApplications,
  createJobApplication,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication
};