const JobOffer = require('../models/jobOffer');
const User = require('../models/user');
const City = require('../models/city')
const Modality = require('../models/modality')
const JobCategory =  require('../models/jobCategory')

class JobOfferService {

    async createJobOffer(data) {
        const { ID_user, ID_city, ID_modality, ID_job_category } = data;
        const user = await User.findByPk(ID_user);
        const city = await City.findByPk(ID_city);
        const modality = await Modality.findByPk(ID_modality);
        const jobCategory = await JobCategory.findByPk(ID_job_category);
        if (!user || !city || !modality || !jobCategory) return 'cannot create job offer';
        return await JobOffer.create({
            ID_user,
            ID_city,
            ID_modality,
            ID_job_category,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    async getAllJobOffers() {
        const jobJobOffers = await JobOffer.findAll();
        if (!jobJobOffers) return 'job offer does not exist';
        return jobJobOffers;
    }

    async getJobOfferByID(id) {
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) return 'job offer does not exist';
        return jobOffer;
    }

    async getJobOfferByUserID(ID_user) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_user,
            },
        });
        if (!jobOffer) return 'job offer does not exist';
        return jobOffer;
    }

    async getJobOfferByCityID(ID_city) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_city,
            },
        });
        if (!jobOffer) return 'job offer does not exist';
        return jobOffer;
    }

    async getJobOfferByModalityID(ID_modality) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_modality,
            },
        });
        if (!jobOffer) return 'job offer does not exist';
        return jobOffer;
    }

    async getJobOfferByJobCategoryID(ID_job_category) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_job_category,
            },
        });
        if (!jobOffer) return 'job offer does not exist';
        return jobOffer;
    }

    async updateJobOffer(id, data) {
        const { status, ID_user, ID_city, ID_modality, ID_job_category } = data;
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) return 'job offer does not exist';
        jobOffer.status = status || jobOffer.status;
        jobOffer.ID_user = ID_user || jobOffer.ID_user;
        jobOffer.ID_city = ID_city || jobOffer.ID_city;
        jobOffer.ID_modality = ID_modality || jobOffer.ID_modality;
        jobOffer.ID_job_category = ID_job_category || jobOffer.ID_job_category;
        await jobOffer.save();
        return jobOffer;
    }

    async deleteJobOffer(id) {
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) return 'job offer does not exist';
        await jobOffer.destroy();
        return 'job offer has been deleted';
    }
}

module.exports = JobOfferService;