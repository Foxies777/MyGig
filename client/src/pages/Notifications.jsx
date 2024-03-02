import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Context } from '../main';
import { fetchNotification } from '../http/notificationAPI';
import { jwtDecode } from 'jwt-decode';
import { Container } from 'react-bootstrap';

const Notifications = observer(() => {
  const { notifications } = useContext(Context); // предполагаем, что `Context` предоставляет notifications

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const notificationData = await fetchNotification(decodedToken.id);
          notifications.setNotifications(notificationData);
        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
      }
    };

    fetchNotifications();
  }, [notifications]);

  return (
    <Container>
      <h1>Уведомления о улицах</h1>
      {notifications.notifications.length > 0 ? (
        <div>
          {notifications.notifications.map((notification, index) => (
            <Container key={index}>
              <h3>{notification.streetName}</h3>
              <p>{notification.streetDescription}</p>
              <div style={{display: 'flex', justifyContent: 'end'}}>
                <p>{new Date(notification.timestamp).toLocaleString()}</p>
              </div>
            </Container>
          ))}
        </div>
      ) : (
        <div>Нет уведомлений.</div>
      )}
      <Navigation />
    </Container>
  );
});

export default Notifications;
