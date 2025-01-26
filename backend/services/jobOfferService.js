const JobOffer = require('../models/jobOffer');
const User = require('../models/user');
const City = require('../models/city')
const Modality = require('../models/modality')
const JobCategory =  require('../models/jobCategory')
const CustomError = require('../errors/custom.errors')

class JobOfferService {

    async createJobOffer(data) {
        const {  ID_user, title, description, salary_range_min, salary_range_max, publication_date, deadline, ID_city, status, ID_modality, ID_job_category } = data;
        const user = await User.findByPk(ID_user); 
        const city = await City.findByPk(ID_city);
        const modality = await Modality.findByPk(ID_modality); 
        const jobCategory = await JobCategory.findByPk(ID_job_category);
        if (!user || !city || !modality || !jobCategory) throw CustomError.badRequest("all fields are required");
        return await JobOffer.create({ 
            ID_user,
            title,
            description,
            salary_range_min,
            salary_range_max,
            publication_date,
            deadline,
            ID_city,
            status,
            ID_modality,
            ID_job_category
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
        const { ID_user, title, description, salary_range_min, salary_range_max, publication_date, deadline, ID_city, status, ID_modality, ID_job_category } = data;
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) return 'job offer does not exist';
        jobOffer.title = title || jobOffer.title;
        jobOffer.description = description || jobOffer.description;
        jobOffer.salary_range_min = salary_range_min || jobOffer.salary_range_min;
        jobOffer.salary_range_max = salary_range_max || jobOffer.salary_range_max;
        jobOffer.publication_date = publication_date || jobOffer.publication_date;
        jobOffer.deadline = deadline || jobOffer.deadline;
        jobOffer.ID_city = ID_city || jobOffer.ID_city;
        jobOffer.status = status || jobOffer.status;
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