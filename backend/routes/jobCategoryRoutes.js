const { Router } = require('express');
const JobCategoryController = require('../controllers/jobCategoryControllers');
const JobCategoryService = require('../services/jobCategoryService');
const AuthMiddleware = require('../middlewares/auth.middleware')

class JobCategoryRoutes {

  static get routes() {


    const router = Router();


    const service = new JobCategoryService();
    const controller = new JobCategoryController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllJobCategories);

    router.post('/', controller.createJobCategory);

    router.get('/:id', controller.getJobCategoryByID);

    router.put('/:id', controller.updateJobCategory);

    router.delete('/:id', controller.deleteJobCategory);

    return router;
  }
}

module.exports = JobCategoryRoutes;