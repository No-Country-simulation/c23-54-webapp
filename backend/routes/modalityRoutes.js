const { Router } = require('express');
const ModalityController = require('../controllers/modalityControllers');
const ModalityService = require('../services/modalityService');
const AuthMiddleware = require('../middlewares/auth.middleware')

class ModalityRoutes {

  static get routes() {


    const router = Router();


    const service = new ModalityService();
    const controller = new ModalityController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllModalities);

    router.post('/', controller.createModality);

    router.get('/:id', controller.getModalityByID);

    router.put('/:id', controller.updateModality);

    router.delete('/:id', controller.deleteModality);

    return router;
  }
}

module.exports = ModalityRoutes;