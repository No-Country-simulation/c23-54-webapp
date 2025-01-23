const JobApplication = require('../models/jobApplication');
const JobOffer = require('../models/jobOffer');
const User = require('../models/user');

class JobApplicationService {

    async createJobApplication(data) { 
        const { userID, jobOfferID } = data;
        const user = await User.findByPk(userID);
        const jobOffer = await JobOffer.findByPk(jobOfferID);
        if (!user || !jobOffer) return 'No se pudo crear la solicitud de empleo';
        return await JobApplication.create({
            userID,
            jobOfferID,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    

    async getAllJobApplications() {
        const jobApplications = await JobApplication.findAll();
        if (!jobApplications) return 'No se pudo encontrar la solicitud de empleo';
        return jobApplications;
    }

    async getJobApplicationByID(id) {
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) return 'No se pudo encontrar la solicitud de empleo';
        return jobApplication;
    }

    async getJobApplicationByUserID(ID_user) {
        const jobApplication = await JobApplication.findAll({
            where: {
                ID_user,
            },
        });
        if (!jobApplication) return 'No se pudo encontrar la solicitud de empleo';
        return jobApplication;
    }

    async getJobApplicationsByOfferID(ID_offer) {
        const jobApplication = await JobApplication.findAll({
            where: {
                ID_offer,
            },
        })
        if (!jobApplication) return 'No se pudo encontrar la solicitud de empleo'
    }

    async updateJobApplication(data) {
        const { id, status } = data;
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) return 'No se pudo encontrar la solicitud de empleo';
        jobApplication.status = status;
        await jobApplication.save();
        return jobApplication;
    }

    async deleteJobApplication(id) {
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) return 'No se pudo encontrar la solicitud de empleo';
        await jobApplication.destroy();
        return 'Solicitud de empleo eliminada correctamente';
    }

}
module.exports = JobApplicationService;