import addNotification, { Notifications } from 'react-push-notification';

function Notification(props) {
    if (props.message !== undefined) {
        let message = props.message.split(', ')[0]
        console.log(message);
        addNotification({
            title: 'Вы находитесь на',
            message: message,
            native: true
        });
        // Здесь возвращайте null (или другой компонент), если вы не хотите ничего рендерить
        return null;
    }
    return (
        <div className="Notification">
            <Notifications />

        </div>
    )
}

export default Notification;
