const { User, Notification, Street } = require('../models/models');

class NotificationController {
    async getUserStreetNotifications(userId) {
        userId = Number(userId);
        if (typeof userId !== 'number' || isNaN(userId)) {
            console.error('Ошибка: ID пользователя должен быть числом');
            return [];
        }
        try {
            const userWithNotifications = await User.findOne({
                where: { id: userId },
                include: [{
                    model: Notification,
                    include: [{
                        model: Street,
                        attributes: ['street_name', 'description']
                    }]
                }]
            });
            if (userWithNotifications) {
                return userWithNotifications.notifications.map(notification => {
                    const street = notification.street ? notification.street.dataValues : null;
                    return {
                        timestamp: notification.dataValues.timestamp,
                        streetName: street ? street.street_name : "Название улицы отсутствует",
                        streetDescription: street ? street.description : "Описание улицы отсутствует"
                    };
                });
            } else {
                return [];
            }

        } catch (error) {
            console.error('Ошибка при получении уведомлений пользователя:', error);
            throw error;
        }
    }

    async create(req, res) {
        try {
            const newNotification = await Notification.create({
                userId: req.body.userId,
                streetId: req.body.streetId,
                timestamp: req.body.timestamp
            });
            return res.status(201).json(newNotification);
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }
}


module.exports = new NotificationController();
