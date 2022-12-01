export interface INotification {
    _id: string,
    user: string,
    text: string,
    type: string,
    checked: boolean
}


export interface NotificationState {
    NotificationInfo: INotification;
    error: string;
}

export enum NotificationActionTypes {
    FETCH_NOTIFICATION = 'FETCH_NOTIFICATION',
    FETCH_NOTIFICATION_ERROR = 'FETCH_NOTIFICATION_ERROR',
}

interface FetchNotificationAction {
    type: NotificationActionTypes.FETCH_NOTIFICATION;
    payload: INotification
}

interface FetchNotificationErrorAction {
    type: NotificationActionTypes.FETCH_NOTIFICATION_ERROR;
    payload: string
}

export type NotificationAction = FetchNotificationAction | FetchNotificationErrorAction