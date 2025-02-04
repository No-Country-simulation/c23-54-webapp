const { User, Notification, JobApplication, JobOffer, ApplicationStatus } = require("../models/relationship");
const CustomError = require('../errors/custom.errors');

class NotificationService {

    async createNotification(data) {
        const { ID_user, ID_application, message, type, send_date, read } = data;
        const user = await User.findByPk(ID_user);
        const jobApplication = await JobApplication.findByPk(ID_application);
        if (!user || !jobApplication) throw CustomError.badRequest("Notification does not exist");
        return await Notification.create({
            ID_user,
            ID_application,
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

    async getNotificationsByUserID(ID_user) {
        const notifications = await Notification.findAll({
            where: { ID_user },
            attributes: ['message', 'read', 'send_date', 'type'],
            include: [
                {
                    model: JobApplication, include:
                        [{ model: JobOffer, attributes: ['ID_offer', 'title'] },
                        { model: ApplicationStatus, attributes: ['ID_application_status', 'status'] }],
                    attributes: ['ID_application', 'application_date']
                }]
        });
        if (!notifications) throw CustomError.badRequest("Notifications does not exist");
        return notifications;

    }


    async updateNotification(id, data) {
        const { read } = data;
        const notification = await Notification.findByPk(id);
        if (!notification) throw CustomError.badRequest("Notification does not exist");
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