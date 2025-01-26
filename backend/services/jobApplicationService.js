const JobApplication = require('../models/jobApplication');
const JobOffer = require('../models/jobOffer');
const ApplicationStatus = require('../models/applicationStatus');
const User = require('../models/user');
const CustomError = require('../errors/custom.errors')

class JobApplicationService {

    async createJobApplication(data) { 
        const { ID_user, ID_offer, application_date, ID_application_status, comments } = data;
        const user = await User.findByPk(ID_user); 
        const offer = await JobOffer.findByPk(ID_offer);
        const applicationStatus = await ApplicationStatus.findByPk(ID_application_status);
        if (!user || !offer || !applicationStatus) throw CustomError.badRequest("all fields are required");
        return await JobApplication.create({ 
            ID_user,
            ID_offer,
            application_date,
            ID_application_status,
            comments
            });
    }
    

    async getAllJobApplications() {
        const jobApplications = await JobApplication.findAll();
        if (!jobApplications) throw CustomError.badRequest("job application does not exist");
        return jobApplications;
    }

    async getJobApplicationByID(id) {
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) throw CustomError.badRequest("job application does not exist");
        return jobApplication;
    }

    async getJobApplicationByUserID(ID_user) {
        const jobApplication = await JobApplication.findAll({
            where: {
                ID_user,
            },
        });
        if (!jobApplication) throw CustomError.badRequest("job application does not exist");
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

    async updateJobApplication(id, data) {
        const { status } = data;
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) throw CustomError.badRequest("job application does not exist");
        jobApplication.status = status || jobApplication.status;
        await jobApplication.save();
        return jobApplication;
    }

    async deleteJobApplication(id) {
        const jobApplication = await JobApplication.findByPk(id);
        if (!jobApplication) throw CustomError.badRequest("job application does not exist");
        await jobApplication.destroy();
        return 'job application has been deleted';
    }

}
module.exports = JobApplicationService;