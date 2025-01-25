const { Router } = require('express');
const NotificationController = require('../controllers/notificationControllers');
const NotificationService = require('../services/notificationService')
const AuthMiddleware = require('../middlewares/auth.middleware')

class NotificationRoutes {

  static get routes() {


    const router = Router();


    const service = new NotificationService();
    const controller = new NotificationController(service);

    const authMiddleware = new AuthMiddleware();

    router.get('/', controller.getAllNotifications);

    router.post('/', controller.createNotification);

    router.get('/:id', controller.getNotificationById);

    router.put('/:id', controller.updateNotification);

    router.delete('/:id', controller.deleteNotification);

    return router;
  }
}

module.exports = NotificationRoutes;