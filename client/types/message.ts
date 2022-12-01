export interface IMessage {
    _id: string,
    user: string,
    message: string
    chat: string,
    checked: boolean
}


export interface MessageState {
    MessageInfo: IMessage;
    error: string;
}

export enum MessageActionTypes {
    FETCH_MESSAGE = 'FETCH_MESSAGE',
    FETCH_MESSAGE_ERROR = 'FETCH_MESSAGE_ERROR',
}

interface FetchMessageAction {
    type: MessageActionTypes.FETCH_MESSAGE;
    payload: IMessage
}

interface FetchMessageErrorAction {
    type: MessageActionTypes.FETCH_MESSAGE_ERROR;
    payload: string
}

export type MessageAction = FetchMessageAction | FetchMessageErrorAction