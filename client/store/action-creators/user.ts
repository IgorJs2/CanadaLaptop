import {Dispatch} from "react";
import {UserAction, UserActionTypes} from "../../types/user";
import axios, {AxiosError} from "axios";
import {AuthDto} from "../../dto/AuthDto";

export const Autorize = (payload: AuthDto) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
               ...payload
            })
            dispatch({type: UserActionTypes.FETCH_AUTHORIZE, payload: response.data})
        } catch (e: any) {
            console.log(e)
            if(e instanceof AxiosError){
                dispatch({
                    type: UserActionTypes.FETCH_USER_ERROR,
                    payload: e.message})
            }
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: "Server error please try again later"})
        }
    }
}

export const fetchCurrentUser = (token: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/user/profile', config)
            dispatch({type: UserActionTypes.FETCH_USER, payload: {...response.data, token}})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Произошла ошибка при получении пользователя'})
        }
    }
}

export const fetchUsers = (token: string, query: any | undefined) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
                params: {
                   query: JSON.stringify(query)
                }
            };
            const response = await axios.get('http://localhost:5000/user/', config)
            dispatch({type: UserActionTypes.FETCH_USERS, payload: response.data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Произошла ошибка при получении пользователя'})
        }
    }
}

export const fetchUserInfo = (token: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/user/profile', config)
            dispatch({type: UserActionTypes.FETCH_USER_INFO, payload: response.data})
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Произошла ошибка при получении пользователя'})
        }
    }
}
