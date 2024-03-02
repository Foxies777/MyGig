const express = require('express');
const NotificationController = require('../controllers/notificationController');
const router = express.Router();

// Измененный маршрут, принимающий userId из параметров URL
router.get('/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).send('UserID должен быть числом');
    }

    try {
        // Предполагая, что getUserStreetNotifications является асинхронной функцией
        const notifications = await NotificationController.getUserStreetNotifications(userId);
        res.json(notifications);
    } catch (error) {
        console.error('Ошибка при получении уведомлений:', error);
        res.status(500).send('Произошла ошибка при получении уведомлений');
    }
});

router.post('/', NotificationController.create);

module.exports = router;