const ChangeHistory = require("../models/changeHistory");
const User = require("../models/user");
const Entity = require("../models/entity");
const Action = require("../models/action");
const CustomError = require("../errors/custom.errors");

class ChangeHistoryService {

  async createChangeHistory(data) {
    const { ID_user, ID_entity, ID_action, change_date, change_description } = data;
    const user = await User.findByPk(ID_user);
    const entity = await Entity.findByPk(ID_entity);
    const action = await Action.findByPk(ID_action);
    if (!user || !entity || !action) throw CustomError.badRequest("Change history does not exist");
    return await ChangeHistory.create({
      ID_user,
      ID_entity,
      ID_action,
      change_date,
      change_description
      });
  }

  async getAllChangeHistories() {
    const changeHistories = await ChangeHistory.findAll();
    if (!changeHistories) throw CustomError.badRequest("Change history does not exist");
    return changeHistories;
  }

  async getChangeHistoryByID(id) {
    const changeHistory = await ChangeHistory.findByPk(id);
    if (!changeHistory) throw CustomError.badRequest("Change history does not exist");
    return changeHistory;
  }

  async updateChangeHistory(data) {
    const { id, change_date, change_description } = data;
    const changeHistory = await ChangeHistory.findByPk(id);
    if (!changeHistory) throw CustomError.badRequest("Change history does not exist");
    changeHistory.change_date = change_date;
    changeHistory.change_description = change_description;
    await changeHistory.save();
    return changeHistory;
  }

  async deleteChangeHistory(id) {
    const changeHistory = await ChangeHistory.findByPk(id);
    if (!changeHistory) throw CustomError.badRequest("Change history does not exist");
    await changeHistory.destroy();
    return "Change history has been deleted";
  }
}
module.exports = ChangeHistoryService;
