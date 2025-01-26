const Entity = require("../models/entity");
const CustomError = require('../errors/custom.errors')


class EntityService {

    async createEntity(data) {
        const { name, description } = data;
        const entity = await Entity.create({ name, description });
        if (!entity) return 'cannot create entity';
        return entity;
    }

    async getAllEntities() {
        const entities = await Entity.findAll();
        if (!entities) return 'entity does not exist';
        return entities;
    }

    async getEntityByID(id) {
        const entity = await Entity.findByPk(id);
        if (!entity) return 'entity does not exist';
        return entity;
    }

    async updateEntity(id, data) {
        const { name, description } = data;
        const entity = await Entity.findByPk(id);
        if (!entity) return 'entity does not exist';
        entity.name = name || entity.name;
        entity.description = description || entity.description;
        await entity.save();
        return entity;
    }

    async deleteEntity(id) {
        const entity = await Entity.findByPk(id);
        if (!entity) return 'entity does not exist';
        await entity.destroy();
        return 'entity has been deleted';
    }

}

module.exports = EntityService;