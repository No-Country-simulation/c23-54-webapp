const ModalityService = require("../services/modalityService");
const CustomError = require("../errors/custom.errors");

class ModalityController {
  constructor(modalityService = new ModalityService()) {
    this.modalityService = modalityService;
    this.getAllModalities = this.getAllModalities.bind(this);
    this.createModality = this.createModality.bind(this);
    this.getModalityByID = this.getModalityByID.bind(this);
    this.updateModality = this.updateModality.bind(this);
    this.deleteModality = this.deleteModality.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllModalities(req, res) {
    try {
      const modalities = await this.modalityService.getAllModalities();
      res.status(200).json(modalities);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createModality(req, res) {
    try {
      const modality = await this.modalityService.createModality(req.body);
      res.status(201).json(modality);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getModalityByID(req, res) {
    try {
      const modality = await this.modalityService.getModalityByID(req.params.id);
      if (modality) {
        res.status(200).json(modality);
      } else {
        res.status(404).json({ message: "Modality not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateModality(req, res) {
    try {
      const updatedModality = await this.modalityService.updateModality(req.params.id, req.body);
      if (updatedModality) {
        res.status(200).json(updatedModality);
      } else {
        res.status(404).json({ message: "Modality not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteModality(req, res) {
    try {
      const deletedModality = await this.modalityService.deleteModality(req.params.id);
      if (deletedModality) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Modality not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = ModalityController;