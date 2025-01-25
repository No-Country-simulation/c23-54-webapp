const { Router } = require('express');
const EntityController = require('../controllers/entityControllers');
const EntityService = require('../services/entityService');
const AuthMiddleware = require('../middlewares/auth.middleware')

class EntityRoutes {

  static get routes() {


    const router = Router();


    const service = new EntityService();
    const controller = new EntityController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllEntities);

    router.post('/', controller.createEntity);

    router.get('/:id', controller.getEntityByID);

    router.put('/:id', controller.updateEntity);

    router.delete('/:id', controller.deleteEntity);

    return router;
  }
}

module.exports = EntityRoutes;