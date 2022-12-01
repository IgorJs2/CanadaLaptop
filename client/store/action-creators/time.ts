import {Dispatch} from "react";
import {TimeAction, TimeActionTypes} from "../../types/time";
import axios from "axios";

export const fetchTime = (token: string) => {
    return async (dispatch: Dispatch<TimeAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: TimeActionTypes.FETCH_TIME, payload: response.data})
        } catch (e) {
            dispatch({
                type: TimeActionTypes.FETCH_TIME_ERROR,
                payload: 'Произошла ошибка при получении time'})
        }
    }
}
