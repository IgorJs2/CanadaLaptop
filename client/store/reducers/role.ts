import {RoleAction, RoleActionTypes, RoleState} from "../../types/role";


const initialState: RoleState = {
    RoleInfo: {
        _id: "",
        name: "",
        _permissions: [],
        active: false
    },
    Roles: [],
    error: ''
}

export const RoleReducer = (state = initialState, action: RoleAction): RoleState => {
    switch (action.type) {
        case RoleActionTypes.FETCH_ROLE_ERROR:
            return {...state, error: action.payload}
        case RoleActionTypes.FETCH_ROLE:
            return {...state, RoleInfo: action.payload}
        case RoleActionTypes.FETCH_ROLES:
            return {...state, Roles: action.payload}
        default:
            return state
    }
}