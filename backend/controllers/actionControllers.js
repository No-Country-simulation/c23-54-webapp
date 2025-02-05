const ActionService = require("../services/actionService");
const CustomError = require("../errors/custom.errors");

class ActionController {
  constructor(actionService = new ActionService()) {
    this.actionService = actionService;
    this.getAllActions = this.getAllActions.bind(this);
    this.createAction = this.createAction.bind(this);
    this.getActionByID = this.getActionByID.bind(this);
    this.updateAction = this.updateAction.bind(this);
    this.deleteAction = this.deleteAction.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllActions(req, res) {
    try {
      const actions = await this.actionService.getAllActions();
      res.status(200).json(actions);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createAction(req, res) {
    try {
      const action = await this.actionService.createAction(req.body);
      res.status(201).json(action);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getActionByID(req, res) {
    try {
      const action = await this.actionService.getActionByID(req.params.id);
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateAction(req, res) {
    try {
      const updatedAction = await this.actionService.updateAction(req.params.id, req.body);
      if (updatedAction) {
        res.status(200).json(updatedAction);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteAction(req, res) {
    try {
      const deletedAction = await this.actionService.deleteAction(req.params.id);
      if (deletedAction) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = ActionController;