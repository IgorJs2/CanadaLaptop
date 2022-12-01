import {MailAction, MailActionTypes, MailState} from "../../types/mail";


const initialState: MailState = {
    MailInfo: {
        _id: "", short_name: "", from: {
            _id: "",
            login: "",
            fullname: "",
            avatar: "",
            type: "",
            email: "",
            mobile: "",
            _role: {},
            _time: [],
        }, message: "", to: {
            _id: "",
            login: "",
            fullname: "",
            avatar: "",
            type: "",
            email: "",
            mobile: "",
            _role: {},
            _time: [],
        }, checked: false, favourite: false, date: "",
    },
    Mails: [],
    error: ''
}

export const MailReducer = (state = initialState, action: MailAction): MailState => {
    switch (action.type) {
        case MailActionTypes.FETCH_MAIL_ERROR:
            return {...state, error: action.payload}
        case MailActionTypes.FETCH_MAIL:
            return {...state, Mails: action.payload}
        case MailActionTypes.FETCH_SEND_MAIL:
            return {...state, MailInfo: action.payload}
        case MailActionTypes.FETCH_MAIL_INFO:
            return {...state, MailInfo: action.payload}
        default:
            return state
    }
}