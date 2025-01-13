const Notification = require('../models/notification');

// Get all notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new notification
const createNotification = async (req, res) => {
  const { ID_user, ID_job_offer, message, type, send_date } = req.body;

  try {
    const newNotification = await Notification.create({
      ID_user,
      ID_job_offer,
      message,
      type,
      send_date
    });
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a notification by ID
const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a notification by ID
const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { ID_user, ID_job_offer, message, type, send_date } = req.body;

  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      notification.ID_user = ID_user || notification.ID_user;
      notification.ID_job_offer = ID_job_offer || notification.ID_job_offer;
      notification.message = message || notification.message;
      notification.type = type || notification.type;
      notification.send_date = send_date || notification.send_date;

      await notification.save();
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a notification by ID
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByPk(id);
    if (notification) {
      await notification.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Notification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNotifications,
  createNotification,
  getNotificationById,
  updateNotification,
  deleteNotification
};