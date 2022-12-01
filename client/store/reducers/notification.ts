import {NotificationAction, NotificationActionTypes, NotificationState} from "../../types/notification";


const initialState: NotificationState = {
    NotificationInfo: {
        _id: "",
        user: "",
        text: "",
        type: "",
        checked: false
    },
    error: ''
}

export const NotificationReducer = (state = initialState, action: NotificationAction): NotificationState => {
    switch (action.type) {
        case NotificationActionTypes.FETCH_NOTIFICATION_ERROR:
            return {...state, error: action.payload}
        case NotificationActionTypes.FETCH_NOTIFICATION:
            return {...state, NotificationInfo: action.payload}
        default:
            return state
    }
}