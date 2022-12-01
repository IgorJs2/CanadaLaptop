import {Dispatch} from "react";
import {MessageAction, MessageActionTypes} from "../../types/message";
import axios from "axios";

export const fetchMessage = (token: string) => {
    return async (dispatch: Dispatch<MessageAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: MessageActionTypes.FETCH_MESSAGE, payload: response.data})
        } catch (e) {
            dispatch({
                type: MessageActionTypes.FETCH_MESSAGE_ERROR,
                payload: 'Произошла ошибка при получении mail'})
        }
    }
}
