export interface IUser {
    _id: string,
    login: string,
    type: string,
    avatar: string,
    full_name: string,
    email: string,
    mobile: string,
    _role: {name: string},
    _time: string[],
}

export interface IUsersInfo{
    _id: string,
    login: string,
    type: string,
    avatar: string,
    fullname: string,
    email: string,
    mobile: string,
    _role: object,
}

export interface UserState {
    currentUser: IUser & {token: string};
    usersInfo: IUsersInfo;
    users: IUser[];
    error: string;
}

export enum UserActionTypes {
    FETCH_AUTHORIZE = "FETCH_AUTHORIZE",
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_INFO = "FETCH_USER_INFO",
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
}

interface FetchAuthorizeAction {
    type: UserActionTypes.FETCH_AUTHORIZE;
    payload: { access_token: string }
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
    payload: IUser & {token: string}
}

interface FetchUsersAction {
    type: UserActionTypes.FETCH_USERS;
    payload: IUser[]
}

interface FetchUserInfoAction {
    type: UserActionTypes.FETCH_USER_INFO;
    payload: IUsersInfo
}


interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string
}

export type UserAction = FetchAuthorizeAction | FetchUserAction | FetchUserErrorAction | FetchUsersAction | FetchUserInfoAction