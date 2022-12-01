export interface IChat {
    _id: string,
    type: string,
    first_user: string,
    second_user: string,
    messages: string[],
    users: string[]
}


export interface ChatState {
    ChatInfo: IChat;
    error: string;
}

export enum ChatActionTypes {
    FETCH_CHAT = 'FETCH_CHAT',
    FETCH_CHAT_ERROR = 'FETCH_CHAT_ERROR',
}

interface FetchChatAction {
    type: ChatActionTypes.FETCH_CHAT;
    payload: IChat
}

interface FetchChatErrorAction {
    type: ChatActionTypes.FETCH_CHAT_ERROR;
    payload: string
}

export type ChatAction = FetchChatAction | FetchChatErrorAction