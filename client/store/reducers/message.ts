import {MessageAction, MessageActionTypes, MessageState} from "../../types/message";


const initialState: MessageState = {
    MessageInfo: {
        _id: "",
        user: "",
        message: "",
        chat: "",
        checked: false
    },
    error: ''
}

export const MessageReducer = (state = initialState, action: MessageAction): MessageState => {
    switch (action.type) {
        case MessageActionTypes.FETCH_MESSAGE_ERROR:
            return {...state, error: action.payload}
        case MessageActionTypes.FETCH_MESSAGE:
            return {...state, MessageInfo: action.payload}
        default:
            return state
    }
}