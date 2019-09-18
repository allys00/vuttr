import { notification } from 'antd';
import './Notification.scss';

export enum NOTIFICATION_TYPE {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning',
}

const Notification = (type: NOTIFICATION_TYPE, message: string, description: string) => {
    notification[type]({
        message,
        description,
        className: type,
    });
};

export default Notification;