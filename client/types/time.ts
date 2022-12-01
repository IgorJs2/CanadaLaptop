export interface ITime {
    _id: string,
    user: string,
    date_start: string,
    date_finish: string,
    total: number
}


export interface TimeState {
    TimeInfo: ITime;
    error: string;
}

export enum TimeActionTypes {
    FETCH_TIME = 'FETCH_TIME',
    FETCH_TIME_ERROR = 'FETCH_TIME_ERROR',
}

interface FetchTimeAction {
    type: TimeActionTypes.FETCH_TIME;
    payload: ITime
}

interface FetchTimeErrorAction {
    type: TimeActionTypes.FETCH_TIME_ERROR;
    payload: string
}

export type TimeAction = FetchTimeAction | FetchTimeErrorAction