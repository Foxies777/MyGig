import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { fetchStreet } from '../http/streetAPI';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

const MobileNotifications = observer((props) => {

    const { streets } = useContext(Context);

    useEffect(() => {
        fetchStreet()
            .then(data => streets.setStreets(data))
            .catch(error => console.error('Error fetching streets:', error));
        const permission = localStorage.getItem('notificationPermission');
        if (permission === 'granted') {
            setAgree(true);
        }
    }, [])

    const [agree, setAgree] = useState(false);

    const requestNotificationPermission = async () => {
        let perm = await Notification.requestPermission();
        if (perm === 'granted') {
            new Notification('Привет');
            setAgree(true);
            localStorage.setItem('notificationPermission', 'granted');
        }
    };

    return (
        <div className={agree ? "disable" : "AgreeNotification"}>
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <h3>Разрешите показ уведомлений</h3>
            <p>Для корректной работы сайта вам нужно разрешить показ уведомлений</p>
            <Button onClick={requestNotificationPermission}>Разрешить</Button>
        </div>
    );
});

export default MobileNotifications;
