const JobCategory = require("../models/jobCategory");
const CustomError = require('../errors/custom.errors')


class JobCategoryService {

    async jobCategoryExists(ID_job_category) {
        const jobCategory = await JobCategory.count({ where: { ID_job_category } });
        if (!jobCategory) throw CustomError.badRequest('Job category does not exist');
    }

}

module.exports = JobCategoryService;