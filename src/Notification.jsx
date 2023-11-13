import React from 'react';
import Map from './Map';
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';
function Notification() {
    function buttonOnClick() {
        addNotification({
            title: 'Вы находитесь на',
            message: Map.location,
            native: true
        })
        console.log('Tap');
    };
    return (
        <div className="Notification">
            <Notifications />
            <h1>Hey Geek!</h1>
            <button onClick={buttonOnClick}>
                Push Notification
            </button>
        </div>
    );
}
export default Notification