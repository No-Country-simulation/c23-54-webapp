const JobCategory = require("../models/jobCategory");
const CustomError = require('../errors/custom.errors')


class JobCategoryService {

    async createJobCategory(data) {
        const { ID_job_category, name, description } = data;
        const jobCategory = await JobCategory.create({ ID_job_category, name, description });
        if (!jobCategory) return 'cannot create job category';
        return jobCategory; 
    }

    async getAllJobCategories() {
        const jobCategories = await JobCategory.findAll();
        if (!jobCategories) return 'job category does not exist';
        return jobCategories;
    }

    async getJobCategoryByID(id) {
        const jobCategory = await JobCategory.findByPk(id);
        if (!jobCategory) return 'job category does not exist';
        return jobCategory;
    }

    async updateJobCategory(data) {
        const { id, ID_job_category, name, description } = data;
        const jobCategory = await JobCategory.findByPk(id);
        if (!jobCategory) return 'job category does not exist';
        jobCategory.ID_job_category = ID_job_category  || jobCategory.ID_job_category;
        jobCategory.name = name || jobCategory.name;
        jobCategory.description = description || jobCategory.description;
        await jobCategory.save();
        return jobCategory;
    }

    async deleteJobCategory(id) {
        const jobCategory = await JobCategory.findByPk(id);
        if (!jobCategory) return 'job category does not exist';
        await jobCategory.destroy();
        return 'job category has been deleted';
    }

}

module.exports = JobCategoryService;