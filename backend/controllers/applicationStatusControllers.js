const ApplicationStatusService = require('../services/applicationStatusService');
const CustomError = require("../errors/custom.errors");

class ApplicationStatusController {
  constructor(applicationStatusService = new ApplicationStatusService()) {
    this.service = applicationStatusService;

    this.getAllApplicationStatuses = this.getAllApplicationStatuses.bind(this);
    this.createApplicationStatus = this.createApplicationStatus.bind(this);
    this.getApplicationStatusByID = this.getApplicationStatusByID.bind(this);
    this.updateApplicationStatus = this.updateApplicationStatus.bind(this);
    this.deleteApplicationStatus = this.deleteApplicationStatus.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllApplicationStatuses(req, res) {
    try {
      const applicationStatuses = await this.service.getAllApplicationStatuses(); 
      res.status(200).json(applicationStatuses);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createApplicationStatus(req, res) {
    try {
      const { status } = req.body;
      const applicationStatus = await this.service.createApplicationStatus({ status }); 
      res.status(201).json(applicationStatus);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getApplicationStatusByID(req, res) {
    try {
      const { id } = req.params;
      const applicationStatus = await this.service.getApplicationStatusByID(id); 
      res.status(200).json(applicationStatus);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateApplicationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const applicationStatus = await this.service.updateApplicationStatus({ id, status }); 
      res.status(200).json(applicationStatus);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteApplicationStatus(req, res) {
    try {
      const { id } = req.params;
      const applicationStatus = await this.service.deleteApplicationStatus(id);
      res.status(200).json(applicationStatus);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = ApplicationStatusController;
