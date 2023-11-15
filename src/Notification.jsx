import React from 'react';
import Map from './Map';
import ReactDOMServer from 'react-dom/server';
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';
function Notification() {
    function buttonOnClick() {
        const mapElement = <Map location={location ? { location } : null} />;
        const mapString = ReactDOMServer.renderToString(mapElement);
        addNotification({
            title: 'Вы находитесь на',
            message: mapString,
            native: true
        })
        console.log(mapString);
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