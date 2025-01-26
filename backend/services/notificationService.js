const Notification = require("../models/notification");
const User = require("../models/user");
const JobOffer = require("../models/jobOffer");
const CustomError = require('../errors/custom.errors')

class NotificationService {

    async createNotification(data) {
        const { ID_user, ID_offer, message, type, send_date, read } = data;
        const user = await User.findByPk(ID_user);
        const offer = await JobOffer.findByPk(ID_offer);
        if (!user || !offer) throw CustomError.badRequest("Notification does not exist");
        return await Notification.create({
            ID_user,
            ID_offer,
            message,
            type,
            send_date,
            read
            });
    }

    async getAllNotifications() {
        const notifications = await Notification.findAll();
        if (!notifications) throw CustomError.badRequest("Notification does not exist");
        return notifications;
    }

    async getNotificationByID(id) {
        const notification = await Notification.findByPk(id);
        if (!notification) throw CustomError.badRequest("Notification does not exist");
        return notification;
    }

    async updateNotification(id, data) {
        const { message, type, send_date, read } = data;
        const notification = await Notification.findByPk(id);
        if (!notification) throw CustomError.badRequest("Notification does not exist");
        notification.message = message || notification.message;
        notification.type = type || notification.type;
        notification.send_date = send_date || notification.send_date;
        notification.read = read || notification.read;
        await notification.save();
        return notification;
    }

    async deleteNotification(id) {
        const notification = await Notification.findByPk(id);
        if (!notification) throw CustomError.badRequest("Notification does not exist");
        await notification.destroy();
        return "Notification has been deleted";
    }
}
module.exports = NotificationService;