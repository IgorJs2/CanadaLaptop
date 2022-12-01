import {ChatAction, ChatActionTypes, ChatState} from "../../types/chat";


const initialState: ChatState = {
    ChatInfo: {
        _id: "",
        type: "",
        first_user: "",
        second_user: "",
        messages: [],
        users: []
    },
    error: ''
}

export const ChatReducer = (state = initialState, action: ChatAction): ChatState => {
    switch (action.type) {
        case ChatActionTypes.FETCH_CHAT_ERROR:
            return {...state, error: action.payload}
        case ChatActionTypes.FETCH_CHAT:
            return {...state, ChatInfo: action.payload}
        default:
            return state
    }
}