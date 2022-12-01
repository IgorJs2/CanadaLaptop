import {UserAction, UserActionTypes, UserState} from "../../types/user";

const initialState: UserState = {
    currentUser: {
        _id: "",
        login: "",
        full_name: "",
        avatar: "",
        type: "",
        email: "",
        mobile: "",
        _role: {},
        _time: [],
        token: ""
    },
    usersInfo: {
        _id: "",
        login: "",
        fullname: "",
        avatar: "",
        type: "",
        email: "",
        mobile: "",
        _role: {},
    },
    users: [],
    error: "",
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER_ERROR:
            return {...state, error: action.payload}
        case UserActionTypes.FETCH_USER:
            return {...state, error: '', currentUser: action.payload}
        case UserActionTypes.FETCH_AUTHORIZE:
            return {...state, error: '', currentUser: {...state.currentUser, ["token"]: action.payload.access_token}}
        case UserActionTypes.FETCH_USERS:
            return {...state, users: action.payload, error: ""}
        case UserActionTypes.FETCH_USER_INFO:
            return {...state, error: '', usersInfo: action.payload}
        default:
            return state
    }
}