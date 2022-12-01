import {Dispatch} from "react";
import {NotificationAction, NotificationActionTypes} from "../../types/notification";
import axios from "axios";

export const fetchNotification = (token: string) => {
    return async (dispatch: Dispatch<NotificationAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: NotificationActionTypes.FETCH_NOTIFICATION, payload: response.data})
        } catch (e) {
            dispatch({
                type: NotificationActionTypes.FETCH_NOTIFICATION_ERROR,
                payload: 'Произошла ошибка при получении notification'})
        }
    }
}
