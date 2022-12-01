export interface IRole {
    _id: string,
    name: string,
    _permissions: string[],
    active: boolean
}


export interface RoleState {
    RoleInfo: IRole;
    Roles: IRole[];
    error: string;
}

export enum RoleActionTypes {
    FETCH_ROLE = 'FETCH_ROLE',
    FETCH_ROLES = "FETCH_ROLES",
    FETCH_ROLE_ERROR = 'FETCH_ROLE_ERROR',
}

interface FetchRoleAction {
    type: RoleActionTypes.FETCH_ROLE;
    payload: IRole
}

interface FetchRolesAction {
    type: RoleActionTypes.FETCH_ROLES;
    payload: IRole[]
}

interface FetchRoleErrorAction {
    type: RoleActionTypes.FETCH_ROLE_ERROR;
    payload: string
}

export type RoleAction = FetchRoleAction | FetchRoleErrorAction | FetchRolesAction