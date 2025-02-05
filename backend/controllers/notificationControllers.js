const NotificationService = require("../services/notificationService");
const CustomError = require("../errors/custom.errors");

class NotificationController {
  constructor(notificationService = new NotificationService()) {
    this.notificationService = notificationService;
    this.getAllNotifications = this.getAllNotifications.bind(this);
    this.createNotification = this.createNotification.bind(this);
    this.getNotificationById = this.getNotificationById.bind(this);
    this.updateNotification = this.updateNotification.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
    this.getNotificationsByUserID = this.getNotificationsByUserID.bind(this);
  }

  handleError(error, res) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error(`Error: ${error.message}, Stack: ${error.stack}`);
    return res.status(500).json({ error: "Internal server error" });
  }

  async getAllNotifications(req, res) {
    try {
      const notifications = await this.notificationService.getAllNotifications();
      res.status(200).json(notifications);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createNotification(req, res) {
    try {
      const notification = await this.notificationService.createNotification(req.body);
      res.status(201).json(notification);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getNotificationById(req, res) {
    try {
      const notification = await this.notificationService.getNotificationById(req.params.id);
      if (notification) {
        res.status(200).json(notification);
      } else {
        res.status(404).json({ message: "Notification not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getNotificationsByUserID(req, res) {
    try {
      const notifications = await this.notificationService.getNotificationsByUserID(req.params.id);
      if (notifications) {
        res.status(200).json(notifications);
      } else {
        res.status(404).json({ message: "Notifications not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateNotification(req, res) {
    try {
      const updatedNotification = await this.notificationService.updateNotification(req.params.id, req.body);
      if (updatedNotification) {
        res.status(200).json(updatedNotification);
      } else {
        res.status(404).json({ message: "Notification not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async deleteNotification(req, res) {
    try {
      const deletedNotification = await this.notificationService.deleteNotification(req.params.id);
      if (deletedNotification) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Notification not found" });
      }
    } catch (error) {
      this.handleError(error, res);
    }
  }

}

module.exports = NotificationController;