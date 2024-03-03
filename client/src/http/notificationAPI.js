import { $host } from "./index";


export const fetchNotification = async (userId) => {
    const { data } = await $host.get(`api/notifications/${userId}`);
    return data;
};
export const createNotification = async (userId, streetId) => {
    // Формирование данных для уведомления
    const notificationData = {
        userId: userId,
        streetId: streetId,
        timestamp: new Date().toISOString() 
    };

    
    const { data } = await $host.post('api/notifications', notificationData);
    return data;
};

// const fetchUserDataAndStreet = async () => {
//     try {
//         const userData = await check(); // Дожидаемся выполнения промиса
//         const streetData = await fetchStreet(); // Дожидаемся выполнения промиса

//         console.log(userData.id); // Теперь доступен id пользователя
//         console.log(streetData); // Это будет массив или объект со всеми улицами
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//     }
    
// };

// fetchUserDataAndStreet(); 

// const userId = userData.id 
// const streetId = streetData.id 
// createNotification(userId, streetId).then(response => {
//     console.log('Уведомление успешно создано', response);
// }).catch(error => {
//     console.error('Ошибка при создании уведомления', error);
// });
