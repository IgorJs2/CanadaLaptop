import {Dispatch} from "react";
import {ChatAction, ChatActionTypes} from "../../types/chat";
import axios from "axios";

export const fetchChat = (token: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: ChatActionTypes.FETCH_CHAT, payload: response.data})
        } catch (e) {
            dispatch({
                type: ChatActionTypes.FETCH_CHAT_ERROR,
                payload: 'Произошла ошибка при получении чата'})
        }
    }
}
