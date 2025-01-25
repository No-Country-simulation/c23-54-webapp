const JobOfferService = require("../services/jobOfferService");
const CustomError = require("../errors/custom.errors");

class JobOfferController {
  constructor(jobOfferService = new JobOfferService()) {
    this.jobOfferService = jobOfferService;
    this.getAllJobOffers = this.getAllJobOffers.bind(this);
    this.createJobOffer = this.createJobOffer.bind(this);
    this.getJobOfferByID = this.getJobOfferByID.bind(this);
    this.getJobOfferByUserID = this.getJobOfferByUserID.bind(this);
    this.getJobOfferByCityID = this.getJobOfferByCityID.bind(this);
    this.getJobOfferByModalityID = this.getJobOfferByModalityID.bind(this);
    this.getJobOfferByJobCategoryID = this.getJobOfferByJobCategoryID.bind(this);
    this.updateJobOffer = this.updateJobOffer.bind(this);
    this.deleteJobOffer = this.deleteJobOffer.bind(this);
  }

  handleError = error => { 
    if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message });
    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllJobOffers(req, res) { 
    try { 
      const jobOffers = await this.jobOfferService.getAllJobOffers(); 
      res.status(200).json(jobOffers); 
    } catch (error) { 
      this.handleError(error, res); 
    } 
  } 
 
  async createJobOffer(req, res) { 
    try { 
      const jobOffer = await this.jobOfferService.createJobOffer(req.body); 
      res.status(201).json(jobOffer); 
    } catch (error) { 
      this.handleError(error, res); 
    } 
  } 
 
  async getJobOfferByID(req, res) { 
    try { 
      const jobOffer = await this.jobOfferService.getJobOfferByID(req.params.id); 
      if (jobOffer) { 
        res.status(200).json(jobOffer); 
      } else { 
        res.status(404).json({ message: "Job offer not found" }); 
      } 
    } catch (error) { 
      this.handleError(error, res); 
    } 
  } 
 
  async getJobOfferByUserID(req, res) { 
    try { 
      const jobOffer = await this.jobOfferService.getJobOfferByUserID(req.params.userId); 
      if (jobOffer) { 
        res.status(200).json(jobOffer); 
      } else { 
        res.status(404).json({ message: "Job offer not found" }); 
      } 
    } catch (error) { 
      this.handleError(error, res); 
    } 
  } 
 
  async getJobOfferByCityID(req, res) { 
    try { 
      const jobOffer = await this.jobOfferService.getJobOfferByCityID(req.params.userId); 
      if (jobOffer) { 
        res.status(200).json(jobOffer); 
      } else { 
        res.status(404).json({ message: "Job offer not found" }); 
      } 
    } catch (error) { 
      this.handleError(error, res); 
    }
  } 
 
  async getJobOfferByModalityID(req, res) { 
    try { 
      const jobOffer = await this.jobOfferService.getJobOfferByModalityID(req.params.userId); 
      if (jobOffer) { 
        res.status(200).json(jobOffer); 
      } else { 
        res.status(404).json({ message: "Job offer not found" }); 
      } 
    } catch (error) {
      this.handleError(error, res); 
    }
  } 
 
  async getJobOfferByJobCategoryID(req, res) { 
    try { 
      const jobOffer = await this.jobOfferService.getJobOfferByJobCategoryID(req.params.userId); 
      if (jobOffer) { 
        res.status(200).json(jobOffer); 
      } else { 
        res.status(404).json({ message: "Job offer not found" }); 
      } 
    } catch (error) { 
      this.handleError(error, res); 
    } 
  } 
 
  async updateJobOffer(req, res) { 
    try { 
      const updatedJobOffer = await this.jobOfferService.updateJobOffer(req.params.id, req.body); 
      if (updatedJobOffer) { 
        res.status(200).json(updatedJobOffer); 
      } else { 
        res.status(404).json({ message: "Job offer not found" }); 
      } 
    } catch (error) { 
      this.handleError(error, res); 
    } 
  } 
 
  async deleteJobOffer(req, res) { 
    try { 
      const deletedJobOffer = await this.jobOfferService.deleteJobOffer(req.params.id); 
      if (deletedJobOffer) { 
        res.status(204).end(); 
      } else { 
        res.status(404).json({ message: "Job offer not found" }); 
      } 
    } catch (error) { 
      this.handleError(error, res); 
    } 
  } 
} 
 
module.exports = JobOfferController;



