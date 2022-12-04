import {Dispatch} from "react";
import {PermissionAction, PermissionActionTypes} from "../../types/permission";
import axios from "axios";

export const fetchPermission = (token: string) => {
    return async (dispatch: Dispatch<PermissionAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/permission', config)
            dispatch({type: PermissionActionTypes.FETCH_PERMISSIONS, payload: response.data})
        } catch (e) {
            dispatch({
                type: PermissionActionTypes.FETCH_PERMISSION_ERROR,
                payload: 'Произошла ошибка при получении permission'})
        }
    }
}


export const fetchPermissions = (token: string) => {
    return async (dispatch: Dispatch<PermissionAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: PermissionActionTypes.FETCH_PERMISSION, payload: response.data})
        } catch (e) {
            dispatch({
                type: PermissionActionTypes.FETCH_PERMISSION_ERROR,
                payload: 'Произошла ошибка при получении permission'})
        }
    }
}
