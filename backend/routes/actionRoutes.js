const { Router } = require('express');
const ActionController = require('../controllers/actionControllers');
const ActionService = require('../services/actionService');
const AuthMiddleware = require('../middlewares/auth.middleware')

class ActionRoutes {

  static get routes() {


    const router = Router();


    const service = new ActionService();
    const controller = new ActionController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllActions);

    router.post('/', controller.createAction);

    router.get('/:id', controller.getActionByID);

    router.put('/:id', controller.updateAction);

    router.delete('/:id', controller.deleteAction);

    return router;
  }
}

module.exports = ActionRoutes;