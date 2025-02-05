const EntityService = require("../services/entityService");
const CustomError = require("../errors/custom.errors");

class EntityController {
  constructor(entityService = new EntityService()) {
    this.entityService = entityService;
    this.getAllEntities = this.getAllEntities.bind(this);
    this.createEntity = this.createEntity.bind(this);
    this.getEntityByID = this.getEntityByID.bind(this);
    this.updateEntity = this.updateEntity.bind(this);
    this.deleteEntity = this.deleteEntity.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllEntities(req, res) {
    try {
      const entities = await this.entityService.getAllEntities();
      res.status(200).json(entities);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createEntity(req, res) {
    try {
      const entity = await this.entityService.createEntity(req.body);
      res.status(201).json(entity);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getEntityByID(req, res) {
    try {
      const entity = await this.entityService.getEntityByID(req.params.id);
      if (entity) {
        res.status(200).json(entity);
      } else {
        res.status(404).json({ message: "Entity not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateEntity(req, res) {
    try {
      const updatedEntity = await this.entityService.updateEntity(req.params.id, req.body);
      if (updatedEntity) {
        res.status(200).json(updatedEntity);
      } else {
        res.status(404).json({ message: "Entity not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteEntity(req, res) {
    try {
      const deletedEntity = await this.entityService.deleteEntity(req.params.id);
      if (deletedEntity) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Entity not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

module.exports = EntityController;