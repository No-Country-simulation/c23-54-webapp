const JobApplication = require('../models/jobApplication');
const JobOffer = require('../models/jobOffer');
const User = require('../models/user');

class JobApplicationService {

    async createJobApplication(data) { 
        const { ID_user, ID_job_offer } = data;
        const user = await User.findByPk(ID_user);
        const jobOffer = await JobOffer.findByPk(ID_job_offer);
        if (!user || !jobOffer) return 'cannot create job application';
        return await JobApplication.create({
            ID_user,
            ID_job_offer,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    

    async getAllJobApplications() {
        const jobApplications = await JobApplication.findAll();
        if (!jobApplications) return 'job application does not exist';
        return jobApplications;
    }

    async getJobApplicationByID(id) {
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) return 'job application does not exist';
        return jobApplication;
    }

    async getJobApplicationByUserID(ID_user) {
        const jobApplication = await JobApplication.findAll({
            where: {
                ID_user,
            },
        });
        if (!jobApplication) return 'job application does not exist';
        return jobApplication;
    }

    async getJobApplicationsByOfferID(ID_offer) {
        const jobApplication = await JobApplication.findAll({
            where: {
                ID_offer,
            },
        })
        if (!jobApplication) return 'job application does not exist'
    }

    async updateJobApplication(data) {
        const { id, status } = data;
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) return 'job application does not exist';
        jobApplication.status = status || jobApplication.status;
        await jobApplication.save();
        return jobApplication;
    }

    async deleteJobApplication(id) {
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) return 'job application does not exist';
        await jobApplication.destroy();
        return 'job application has been deleted';
    }

}
module.exports = JobApplicationService;