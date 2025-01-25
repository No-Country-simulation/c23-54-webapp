const JobCategoryService = require("../services/jobCategoryService");
const CustomError = require("../errors/custom.errors");

class JobCategoryController {
  constructor(jobCategoryService = new JobCategoryService()) {
    this.jobCategoryService = jobCategoryService;
    this.getAllJobCategories = this.getAllJobCategories.bind(this);
    this.createJobCategory = this.createJobCategory.bind(this);
    this.getJobCategoryByID = this.getJobCategoryByID.bind(this);
    this.updateJobCategory = this.updateJobCategory.bind(this);
    this.deleteJobCategory = this.deleteJobCategory.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllJobCategories(req, res) {
    try {
      const jobCategories = await this.jobCategoryService.getAllJobCategories();
      res.status(200).json(jobCategories);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createJobCategory(req, res) {
    try {
      const jobCategory = await this.jobCategoryService.createJobCategory(req.body);
      res.status(201).json(jobCategory);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getJobCategoryByID(req, res) {
    try {
      const jobCategory = await this.jobCategoryService.getJobCategoryByID(req.params.id);
      if (jobCategory) {
        res.status(200).json(jobCategory);
      } else {
        res.status(404).json({ message: "Job category not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateJobCategory(req, res) {
    try {
      const updatedJobCategory = await this.jobCategoryService.updateJobCategory(req.params.id, req.body);
      if (updatedJobCategory) {
        res.status(200).json(updatedJobCategory);
      } else {
        res.status(404).json({ message: "Job category not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteJobCategory(req, res) {
    try {
      const deletedJobCategory = await this.jobCategoryService.deleteJobCategory(req.params.id);
      if (deletedJobCategory) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Job category not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = JobCategoryController;