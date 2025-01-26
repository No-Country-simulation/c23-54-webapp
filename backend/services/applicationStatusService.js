const ApplicationStatus = require('../models/applicationStatus');
const User = require("../models/user");
const CustomError = require('../errors/custom.errors')

class ApplicationStatusService {

    async createApplicationStatus(data) {
        const { ID_user, status, description } = data;
        const user = await User.findByPk(ID_user);
        if (!user) throw CustomError.badRequest("Application status does not exist");
        return await ApplicationStatus.create({ ID_user, status, description });
    }

    async getAllApplicationStatuses() {
        const applicationStatus = await ApplicationStatus.findAll();
        if (!applicationStatus) return 'application status does not exist';
        return applicationStatus;
    }

    async getApplicationStatusByID(id) {
        const applicationStatus = await ApplicationStatus.findByPk(id);
        if (!applicationStatus) return 'application status does not exist';
        return applicationStatus;
    }

    async updateApplicationStatus(id, data) {
        const { status } = data;
        const applicationStatus = await ApplicationStatus.findByPk(id);
        if (!applicationStatus) return 'application status does not exist';
        applicationStatus.status = status || applicationStatus.status;
        await applicationStatus.save();
        return applicationStatus;
    }

    async deleteApplicationStatus(id) {
        const applicationStatus = await ApplicationStatus.findByPk(id);
        if (!applicationStatus) return 'application status does not exist';
        await applicationStatus.destroy();
        return 'application status has been deleted';
    }
}
module.exports = ApplicationStatusService;