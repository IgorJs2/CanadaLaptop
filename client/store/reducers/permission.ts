import {PermissionAction, PermissionActionTypes, PermissionState} from "../../types/permission";


const initialState: PermissionState = {
    PermissionInfo: {
        _id: "",
        permission: "",
        active: false
    },
    Permissions: [],
    error: ''
}

export const PermissionReducer = (state = initialState, action: PermissionAction): PermissionState => {
    switch (action.type) {
        case PermissionActionTypes.FETCH_PERMISSION_ERROR:
            return {...state, error: action.payload}
        case PermissionActionTypes.FETCH_PERMISSION:
            return {...state, PermissionInfo: action.payload}
        case PermissionActionTypes.FETCH_PERMISSIONS:
            return {...state, Permissions: action.payload}
        default:
            return state
    }
}