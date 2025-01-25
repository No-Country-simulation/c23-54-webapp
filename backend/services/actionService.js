const Action = require("../models/action");
const CustomError = require('../errors/custom.errors')


class ActionService {

    async createAction(data) {
        const { name_action, description_action } = data;
        const action = await Action.create({ name_action, description_action });
        if (!action) return 'cannot create action';
        return action;
    }

    async getAllActions() {
        const actions = await Action.findAll();
        if (!actions) return 'action does not exist';
        return actions;
    }

    async getActionByID(id) {
        const action = await Action.findByPk(id);
        if (!action) return 'action does not exist';
        return action;
    }

    async updateAction(data) {
        const { id, name_action, description_action } = data;
        const action = await Action.findByPk(id);
        if (!action) return 'action does not exist';
        action.name_action = name_action || action.name_action;
        action.description_action = description_action || action.description_action;
        await action.save();
        return action;
    }

    async deleteAction(id) {
        const action = await Action.findByPk(id);
        if (!action) return 'action does not exist';
        await action.destroy();
        return 'action has been deleted';
    }

}

module.exports = ActionService;