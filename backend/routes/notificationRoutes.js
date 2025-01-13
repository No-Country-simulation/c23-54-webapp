const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationControllers');

// Endpoint to get all notifications
router.get('/', notificationController.getAllNotifications);

// Endpoint to create a new notification
router.post('/', notificationController.createNotification);

// Endpoint to get a notification by ID
router.get('/:id', notificationController.getNotificationById);

// Endpoint to update a notification
router.put('/:id', notificationController.updateNotification);

// Endpoint to delete a notification
router.delete('/:id', notificationController.deleteNotification);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

module.exports = router;