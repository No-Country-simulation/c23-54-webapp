const { User, JobOffer, JobCategory, Modality, City, Country } = require('../models/relationship')
const CustomError = require('../errors/custom.errors')

class JobOfferService {

    async createJobOffer(data) {
        const { ID_user, title, description, salary_range_min, salary_range_max, publication_date, deadline, ID_city, status, ID_modality, ID_job_category } = data;
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
        try {
            const jobJobOffers = await JobOffer.findAll(
                {
                    attributes: ['ID_offer', 'title', 'description', 'salary_range_min', 'salary_range_max', 'publication_date', 'deadline', 'status'],
                    include:
                        [{ model: User, attributes: ['name'] },
                        { model: Modality },
                        { model: JobCategory },
                        { model: City, include: { model: Country }, attributes: ['ID_city', 'name'] },
                        ],
                    where: { status: 'open' }
                }
            );
            if (!jobJobOffers) throw CustomError.badRequest("job offer does not exist");
            return jobJobOffers;

        } catch (error) {
            return error

        }
    }

    async getJobOfferByID(id) {
        const jobOffer = await JobOffer.findByPk(id, {
            attributes: ['ID_offer', 'title', 'description', 'salary_range_min', 'salary_range_max', 'publication_date', 'deadline', 'status'],
            include:
                [{ model: User, attributes: ['name', 'ID_user'] },
                { model: Modality },
                { model: JobCategory },
                { model: City, include: { model: Country }, attributes: ['ID_city', 'name'] },
                ],
            where: { status: 'open' }
        });

        if (!jobOffer) throw CustomError.badRequest("job offer does not exist");
        return jobOffer;
    }

    async getJobOfferByUserID(ID_user) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_user,
            },
            attributes: ['ID_offer', 'title', 'description', 'salary_range_min', 'salary_range_max', 'publication_date', 'deadline', 'status'],
            include:
                [{ model: User, attributes: ['name'] },
                { model: Modality },
                { model: JobCategory },
                { model: City, include: { model: Country }, attributes: ['ID_city', 'name'] },
                ],
        });
        if (!jobOffer) throw CustomError.badRequest("job offer does not exist");
        return jobOffer;
    }

    async getJobOfferByCityID(ID_city) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_city,
            },

        });
        if (!jobOffer) throw CustomError.badRequest("job offer does not exist");
        return jobOffer;
    }

    async getJobOfferByModalityID(ID_modality) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_modality,
            },
        });
        if (!jobOffer) throw CustomError.badRequest("job offer does not exist");
        return jobOffer;
    }

    async getJobOfferByJobCategoryID(ID_job_category) {
        const jobOffer = await JobOffer.findAll({
            where: {
                ID_job_category,
            },
        });
        if (!jobOffer) throw CustomError.badRequest("job offer does not exist");
        return jobOffer;
    }

    async updateJobOffer(id, data) {
        const { ID_user, title, description, salary_range_min, salary_range_max, publication_date, deadline, ID_city, status, ID_modality, ID_job_category } = data;
        const jobOffer = await JobOffer.findByPk(id);
        if (!jobOffer) throw CustomError.badRequest("job offer does not exist");
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
        if (!jobOffer) throw CustomError.badRequest("job offer does not exist");
        await jobOffer.destroy();
        return 'job offer has been deleted';
    }
}

module.exports = JobOfferService;