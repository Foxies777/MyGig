import { $host } from "./index";
import { fetchStreet } from "./streetAPI";
import { check } from "./userAPI";
export const fetchNotification = async (userId) => {
    const { data } = await $host.get(`api/notifications/${userId}`);
    return data;
};
// Функция для отправки POST запроса для создания уведомления
export const createNotification = async (userId, streetId) => {
    // Формирование данных для уведомления
    const notificationData = {
        userId: userId,
        streetId: streetId,
        timestamp: new Date().toISOString() // Форматирование текущей даты и времени в ISO строку
    };

    // Отправка POST запроса с данными уведомления
    const { data } = await $host.post('api/notifications', notificationData);
    return data;
};

const fetchUserDataAndStreet = async () => {
    try {
        var userData = await check(); // Дожидаемся выполнения промиса
        var streetData = await fetchStreet(); // Дожидаемся выполнения промиса

        console.log(userData.id); // Теперь доступен id пользователя
        console.log(streetData); // Это будет массив или объект со всеми улицами
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
    
};

fetchUserDataAndStreet(); // Вызываем асинхронную функцию

const userId = userData.id // Замените это вашим способом получения userId
const streetId = streetData.id // Замените это вашим способом получения streetId
createNotification(userId, streetId).then(response => {
    console.log('Уведомление успешно создано', response);
}).catch(error => {
    console.error('Ошибка при создании уведомления', error);
});
