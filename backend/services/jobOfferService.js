const JobOffer = require('../models/jobOffer');
const User = require('../models/user');
const City = require('../models/city')
const Modality = require('../models/modality')
const JobCategory =  require('../models/jobCategory')

class JobOfferService {

    async createJobOffer(data) {
        const { userID, cityID, modalityID, jobCategoryID } = data;
        const user = await User.findByPk(userID);
        const city = await City.findByPk(cityID);
        const modality = await Modality.findByPk(modalityID);
        const jobCategory = await JobCategory.findByPk(jobCategoryID);
        if (!user || !city || !modality || !jobCategory) return 'No se pudo crear el oferta de empleo';
        return await JobOffer.create({
            userID,
            cityID,
            modalityID,
            jobCategoryID,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
     }

    async getJobOfferByID(id) {
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) return 'No se pudo encontrar la oferta de empleo';
        return jobOffer;
    }

    async getJobOfferByUserID(userID) {
        const jobOffer = await JobOffer.findAll({
            where: {
                userID,
            },
        });
        if (!jobOffer) return 'No se pudo encontrar la oferta de empleo';
        return jobOffer;
    }

    async getJobOfferByCityID(cityID) {
        const jobOffer = await JobOffer.findAll({
            where: {
                cityID,
            },
        });
        if (!jobOffer) return 'No se pudo encontrar la oferta de empleo';
        return jobOffer;
    }

    async getJobOfferByModalityID(modalityID) {
        const jobOffer = await JobOffer.findAll({
            where: {
                modalityID,
            },
        });
        if (!jobOffer) return 'No se pudo encontrar la oferta de empleo';
        return jobOffer;
    }

    async getJobOfferByJobCategoryID(jobCategoryID) {
        const jobOffer = await JobOffer.findAll({
            where: {
                jobCategoryID,
            },
        });
        if (!jobOffer) return 'No se pudo encontrar la oferta de empleo';
        return jobOffer;
    }

    async updateJobOffer(data) {
        const { id, status } = data;
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) return 'No se pudo encontrar la oferta de empleo';
        jobOffer.status = status;
        await jobOffer.save();
        return jobOffer;
    }

    async deleteJobOffer(id) {
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) return 'No se pudo encontrar la oferta de empleo';
        await jobOffer.destroy();
        return 'La oferta de empleo ha sido eliminada';
    }
}

module.exports = JobOfferService;