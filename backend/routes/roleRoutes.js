const { Router } = require('express');
const RoleController = require('../controllers/roleControllers');
const RoleService = require('../services/roleServices');
const AuthMiddleware = require('../middlewares/auth.middleware')

class RoleRoutes {

  static get routes() {


    const router = Router();


    const service = new RoleService();
    const controller = new RoleController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllRoles);

    router.post('/', controller.createRole);

    router.get('/:id', controller.getRoleByID);

    router.put('/:id', controller.updateRole);

    router.delete('/:id', controller.deleteRole);

    return router;
  }
}

module.exports = RoleRoutes;