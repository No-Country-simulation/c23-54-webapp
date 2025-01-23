const JobApplicationService = require('../services/jobApplicationService');
const CustomError = require('../errors/custom.errors');

class JobApplicationController {
  constructor(jobApplicationService = new JobApplicationService()) {
    this.jobApplicationService = jobApplicationService;
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`${error}`);
    return res.status(500).json({ error: 'Internal server error' });
  }

  async getAllJobApplications(req, res) {
    try {
      const jobApplications = await this.jobApplicationService.getAllJobApplications();
      res.status(200).json(jobApplications);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createJobApplication(req, res) {
    try {
      const jobApplication = await this.jobApplicationService.createJobApplication(req.body);
      res.status(201).json(jobApplication);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getJobApplicationById(req, res) {
    try {
      const jobApplication = await this.jobApplicationService.getJobApplicationByID(req.params.id);
      if (jobApplication) {
        res.status(200).json(jobApplication);
      } else {
        res.status(404).json({ message: 'Job application not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateJobApplication(req, res) {
    try {
      const updatedJobApplication = await this.jobApplicationService.updateJobApplication(req.params.id, req.body);
      if (updatedJobApplication) {
        res.status(200).json(updatedJobApplication);
      } else {
        res.status(404).json({ message: 'Job application not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteJobApplication(req, res) {
    try {
      const deletedJobApplication = await this.jobApplicationService.deleteJobApplication(req.params.id);
      if (deletedJobApplication) {
        res.status(200).json({ message: 'Job application deleted successfully' });
      } else {
        res.status(404).json({ message: 'Job application not found' });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = JobApplicationController;
