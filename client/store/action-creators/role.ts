import {Dispatch} from "react";
import {RoleAction, RoleActionTypes} from "../../types/role";
import axios from "axios";

export const fetchRole = (token: string) => {
    return async (dispatch: Dispatch<RoleAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: RoleActionTypes.FETCH_ROLE, payload: response.data})
        } catch (e) {
            dispatch({
                type: RoleActionTypes.FETCH_ROLE_ERROR,
                payload: 'Произошла ошибка при получении role'})
        }
    }
}


export const fetchRoles = (token: string) => {
    return async (dispatch: Dispatch<RoleAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: RoleActionTypes.FETCH_ROLE, payload: response.data})
        } catch (e) {
            dispatch({
                type: RoleActionTypes.FETCH_ROLE_ERROR,
                payload: 'Произошла ошибка при получении role'})
        }
    }
}
