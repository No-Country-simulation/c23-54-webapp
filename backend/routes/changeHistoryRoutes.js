const { Router } = require('express');
const ChangeHistoryController = require('../controllers/changeHistoryControllers');
const ChangeHistoryService = require('../services/changeHistoryService');
const AuthMiddleware = require('../middlewares/auth.middleware')

class ChangeHistoryRoutes {

  static get routes() {


    const router = Router();


    const service = new ChangeHistoryService();
    const controller = new ChangeHistoryController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllChangeHistories);

    router.post('/', controller.createChangeHistory);

    router.get('/:id', controller.getChangeHistoryByID);

    router.put('/:id', controller.updateChangeHistory);

    router.delete('/:id', controller.deleteChangeHistory);

    return router;
  }
}

module.exports = ChangeHistoryRoutes;