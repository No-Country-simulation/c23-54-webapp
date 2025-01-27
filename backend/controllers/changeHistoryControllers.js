const ChangeHistoryService = require('../services/changeHistoryService');
const CustomError = require('../errors/custom.errors');

class ChangeHistoryController {
  constructor(changeHistoryService = new ChangeHistoryService()) {
    this.service = changeHistoryService;

    this.getAllChangeHistories = this.getAllChangeHistories.bind(this);
    this.createChangeHistory = this.createChangeHistory.bind(this);
    this.getChangeHistoryByID = this.getChangeHistoryByID.bind(this);
    this.updateChangeHistory = this.updateChangeHistory.bind(this);
    this.deleteChangeHistory = this.deleteChangeHistory.bind(this);
  }

  handleError = (error, res) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  getAllChangeHistories = async (req, res) => {
    try {
      const changeHistories = await this.service.getAllChangeHistories();
      res.status(200).json(changeHistories);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  createChangeHistory = async (req, res) => {
    try {
      const { ID_user, ID_entity, ID_action, change_date, change_description } = req.body;
      const changeHistory = await this.service.createChangeHistory({ ID_user, ID_entity, ID_action, change_date, change_description });
      res.status(201).json(changeHistory);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getChangeHistoryByID = async (req, res) => {
    try {
      const { id } = req.params;
      const changeHistory = await this.service.getChangeHistoryByID(id);
      res.status(200).json(changeHistory);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  updateChangeHistory = async (req, res) => {
    try {
      const { id, change_date, change_description } = req.body;
      const changeHistory = await this.service.updateChangeHistory({ id, change_date, change_description });
      res.status(200).json(changeHistory);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  deleteChangeHistory = async (req, res) => {
    try {
      const { id } = req.params;
      const changeHistory = await this.service.deleteChangeHistory(id);
      res.status(204).end();
    } catch (error) {
      this.handleError(error, res);
    }
  };
}

module.exports = ChangeHistoryController;