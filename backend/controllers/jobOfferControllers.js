const JobOffer = require('../models/jobOffer');

// Get all job offers
const getAllJobOffers = async (req, res) => {
  try {
    const jobOffers = await JobOffer.findAll();
    res.status(200).json(jobOffers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new job offer
const createJobOffer = async (req, res) => {
  const { ID_user, title, description, salary_min_range, salary_max_range, publication_date, deadline, ID_city, status, ID_modality, ID_job_category } = req.body;

  try {
    const newJobOffer = await JobOffer.create({
      ID_user,
      title,
      description,
      salary_min_range,
      salary_max_range,
      publication_date,
      deadline,
      ID_city,
      status,
      ID_modality,
      ID_job_category
    });
    res.status(201).json(newJobOffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a job offer by ID
const getJobOfferById = async (req, res) => {
  const { id } = req.params;

  try {
    const jobOffer = await JobOffer.findByPk(id);
    if (jobOffer) {
      res.status(200).json(jobOffer);
    } else {
      res.status(404).json({ message: 'Job offer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job offer by ID
const updateJobOffer = async (req, res) => {
  const { id } = req.params;
  const { ID_user, title, description, salary_min_range, salary_max_range, publication_date, deadline, ID_city, status, ID_modality, ID_job_category } = req.body;

  try {
    const jobOffer = await JobOffer.findByPk(id);
    if (jobOffer) {
      jobOffer.ID_user = ID_user || jobOffer.ID_user;
      jobOffer.title = title || jobOffer.title;
      jobOffer.description = description || jobOffer.description;
      jobOffer.salary_min_range = salary_min_range || jobOffer.salary_min_range;
      jobOffer.salary_max_range = salary_max_range || jobOffer.salary_max_range;
      jobOffer.publication_date = publication_date || jobOffer.publication_date;
      jobOffer.deadline = deadline || jobOffer.deadline;
      jobOffer.ID_city = ID_city || jobOffer.ID_city;
      jobOffer.status = status || jobOffer.status;
      jobOffer.ID_modality = ID_modality || jobOffer.ID_modality;
      jobOffer.ID_job_category = ID_job_category || jobOffer.ID_job_category;

      await jobOffer.save();
      res.status(200).json(jobOffer);
    } else {
      res.status(404).json({ message: 'Job offer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a job offer by ID
const deleteJobOffer = async (req, res) => {
  const { id } = req.params;

  try {
    const jobOffer = await JobOffer.findByPk(id);
    if (jobOffer) {
      await jobOffer.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Job offer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobOffers,
  createJobOffer,
  getJobOfferById,
  updateJobOffer,
  deleteJobOffer
};  