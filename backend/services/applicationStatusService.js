const ApplicationStatus = require('../models/applicationStatus');

class ApplicationStatusService {

    async createApplicationStatus(data) {
        const { status, description } = data;
        const applicationStatus = await ApplicationStatus.create({ status, description });
        if (!applicationStatus) return 'cannot create application status';
        return applicationStatus;
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