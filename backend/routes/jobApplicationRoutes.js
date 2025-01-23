const { Router } = require('express');
const JobApplicationController = require('../controllers/jobApplicationControllers');
const JobApplicationService = require('../services/jobApplicationService');
class JobApplicationRoutes {

    static get routes() {

        const router = Router()

        const service = new JobApplicationService();
        const controller = new JobApplicationController(service);

        router.get('/', controller.getAllJobApplications);

        router.get('/:id', controller.getJobApplicationById);

        router.get('/user/:userId', controller.getJobApplicationByUserId);

        router.get('/offer/:jobOfferId', controller.getJobApplicationByOfferId);

        router.post('/', controller.createJobApplication);

        router.put('/:id', controller.updateJobApplication);

        router.delete('/:id', controller.deleteJobApplication);

        return router;

    }
}

module.exports = JobApplicationRoutes;
