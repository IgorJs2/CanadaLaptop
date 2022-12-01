export interface IPermission {
    _id: string,
    permission: string,
    active: boolean
}


export interface PermissionState {
    PermissionInfo: IPermission;
    Permissions: IPermission[]
    error: string;
}

export enum PermissionActionTypes {
    FETCH_PERMISSION = 'FETCH_PERMISSION',
    FETCH_PERMISSIONS = 'FETCH_PERMISSIONS',
    FETCH_PERMISSION_ERROR = 'FETCH_PERMISSION_ERROR',
}

interface FetchPermissionAction {
    type: PermissionActionTypes.FETCH_PERMISSION;
    payload: IPermission
}

interface FetchPermissionsAction {
    type: PermissionActionTypes.FETCH_PERMISSIONS;
    payload: IPermission[]
}

interface FetchPermissionErrorAction {
    type: PermissionActionTypes.FETCH_PERMISSION_ERROR;
    payload: string
}

export type PermissionAction = FetchPermissionAction | FetchPermissionErrorAction | FetchPermissionsAction