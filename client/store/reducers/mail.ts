import {MailAction, MailActionTypes, MailState} from "../../types/mail";


const initialState: MailState = {
    MailInfo: {
        _id: "", short_name: "", from: { avatar: "", full_name: "" }, message: "", to: { avatar: "", full_name: "" }
        , checked: false, favourite: false, date: "",
    },
    Mails: [],
    error: ''
}

export const MailReducer = (state = initialState, action: MailAction): MailState => {
    switch (action.type) {
        case MailActionTypes.FETCH_MAILS:
            return {...state, Mails: action.payload}
        case MailActionTypes.FETCH_SEND_MAIL:
            return {...state, MailInfo: action.payload}
        case MailActionTypes.FETCH_MAIL_INFO:
            return {...state, MailInfo: action.payload}
        case MailActionTypes.FETCH_MAIL_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}