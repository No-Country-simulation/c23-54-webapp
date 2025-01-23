const { Router } = require('express');
const JobOfferController = require('../controllers/jobOfferControllers');
const JobOfferService = require('../services/jobOfferService');
class JobOfferRoutes {

    static get routes() {

        const router = Router()

        const service = new JobOfferService();
        const controller = new JobOfferController(service);

        router.get('/', controller.getAllJobOffers);

        router.post('/', controller.createJobOffer);

        router.get('/:id', controller.getJobOfferByID);

        router.get('/user/:userId', controller.getJobOfferByUserID);

        router.get('/city/:cityId', controller.getJobOfferByCityID);

        router.get('/modality/:modalityId', controller.getJobOfferByModalityID);

        router.get('/category/:categoryId', controller.getJobOfferByJobCategoryID);

        router.put('/:id', controller.updateJobOffer);

        router.delete('/:id', controller.deleteJobOffer);

        return router;

    }
}

module.exports = JobOfferRoutes;