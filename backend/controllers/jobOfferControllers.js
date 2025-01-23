const CustomError = require('../errors/custom.errors');
const JobOfferService = require('../services/jobOfferService');

class JobOfferController {
  constructor(jobOfferService = new JobOfferService()) {
    this.jobOfferService = jobOfferService;
  }

  handleError = (error, res) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  };

  getAllJobOffers = async (req, res) => {
    try {
      const jobOffers = await this.jobOfferService.getAllJobOffers();
      res.status(200).json(jobOffers);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  createJobOffer = async (req, res) => {
    try {
      const jobOffer = await this.jobOfferService.createJobOffer(req.body);
      res.status(201).json(jobOffer);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getJobOfferById = async (req, res) => {
    try {
      const jobOffer = await this.jobOfferService.getJobOfferByID(req.params.id);
      if (jobOffer) {
        res.status(200).json(jobOffer);
      } else {
        res.status(404).json({ message: 'Job offer not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateJobOffer = async (req, res) => {
    try {
      const updatedJobOffer = await this.jobOfferService.updateJobOffer(req.params.id, req.body);
      if (updatedJobOffer) {
        res.status(200).json(updatedJobOffer);
      } else {
        res.status(404).json({ message: 'Job offer not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteJobOffer = async (req, res) => {
    try {
      const deletedJobOffer = await this.jobOfferService.deleteJobOffer(req.params.id);
      if (deletedJobOffer) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'Job offer not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  };
}

module.exports = JobOfferController;
