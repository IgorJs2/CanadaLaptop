import {MailCreateDto} from "../dto/MailCreate.dto";
import {IUser} from "./user";

export interface IMail {
    _id: string,
    from: IUser,
    to: IUser,
    message: string,
    checked: boolean,
    favourite: boolean,
    short_name: string
    date: string,
}


export interface MailState {
    MailInfo: IMail
    Mails: IMail[]
    error: string
}

export enum MailActionTypes {
    FETCH_MAIL = 'FETCH_MAIL',
    FETCH_MAIL_INFO = "FETCH_MAIL_INFO",
    FETCH_SEND_MAIL = "FETCH_SEND_MAIL",
    FETCH_MAIL_ERROR = 'FETCH_MAIL_ERROR',
}

interface FetchMailAction {
    type: MailActionTypes.FETCH_MAIL;
    payload: IMail[]
}

interface FetchMailInfoAction {
    type: MailActionTypes.FETCH_MAIL_INFO;
    payload: IMail
}

interface FetchMailSendAction {
    type: MailActionTypes.FETCH_SEND_MAIL;
    payload: IMail
}

interface FetchMailErrorAction {
    type: MailActionTypes.FETCH_MAIL_ERROR;
    payload: string
}

export type MailAction = FetchMailAction | FetchMailErrorAction | FetchMailInfoAction | FetchMailSendAction