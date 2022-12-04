import {Dispatch} from "react";
import {MailAction, MailActionTypes} from "../../types/mail";
import axios from "axios";
import {MailCreateDto} from "../../dto/MailCreate.dto";

export const fetchMail = (token: string) => {
    return async (dispatch: Dispatch<MailAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
            };
            const response = await axios.get('http://localhost:5000/mail/user', config)
            console.log(response.data)
            dispatch({type: MailActionTypes.FETCH_MAILS, payload: response.data})
        } catch (e) {
            console.log(e)
            dispatch({
                type: MailActionTypes.FETCH_MAIL_ERROR,
                payload: e.toString()})
        }
    }
}

export const fetchMailInfo = (token: string, id: string) => {
    return async (dispatch: Dispatch<MailAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
                params: {
                    id
                }
            };
            const response = await axios.get('http://localhost:5000/mail/info', config)
            dispatch({type: MailActionTypes.FETCH_MAIL_INFO, payload: response.data})
        } catch (e) {
            dispatch({
                type: MailActionTypes.FETCH_MAIL_ERROR,
                payload: 'Произошла ошибка при получении mail'})
        }
    }
}

export const fetchSendMail = (token: string, payload: object) => {
    return async (dispatch: Dispatch<MailAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
            };
            const response = await axios.post('http://localhost:5000/mail', {...payload}, config)
            console.log(response.data)
            dispatch({type: MailActionTypes.FETCH_SEND_MAIL, payload: response.data})
        } catch (e) {
            dispatch({
                type: MailActionTypes.FETCH_MAIL_ERROR,
                payload: 'Произошла ошибка при получении mail'})
        }
    }
}

