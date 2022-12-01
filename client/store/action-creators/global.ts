import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {GlobalAction, GlobalActionTypes} from "../../types/globalState";
import {IPartFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_IPart";


export const fetchSearchOptions = (sort_field: string, sort_value: 'asc' | 'desc', token: string, type:string, count: number, page: number) => {
    return async (dispatch: Dispatch<GlobalAction>) => {
        try {
            fetchMaxPage(token, count, type)
            fetchSortValue(sort_value)
            fetchSortField(sort_field)
            dispatch({type: GlobalActionTypes.FETCH_GLOBAL_SEARCH_OPTIONS, payload: {count, page}})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

export const fetchMaxPage = (type: string, filters: IPartFilterData) => {
    return async (dispatch: Dispatch<GlobalAction>, getState: any) => {
        try {
            const {user} = getState()
            const {currentUser} = user
            const token_ = currentUser.token

            const config = {
                "headers": {
                    "Authorization": `Bearer ${token_}`
                },
                params: {
                    filters: JSON.stringify(filters)
                }
            };
            const request = await axios.get(`http://localhost:5000/${type}/number/`, config)
            dispatch({type: GlobalActionTypes.FETCH_GLOBAL_MAXPAGE, payload: {maxpage: request.data}})
        } catch (e: any | AxiosError) {
            console.log(e)
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}


export const fetchFilter = (token: string, count: number, type:string, filter: boolean, filterValue: object) => {
    return async (dispatch: Dispatch<GlobalAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    filters: JSON.stringify(filterValue)
                }
            };
            const request = await axios.get(`http://localhost:5000/${type}/number/`, config)
            dispatch({type: GlobalActionTypes.FETCH_GLOBAL_FILTER, payload: {filter, filterValue, maxpage: request.data}})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

export const fetchSortValue = (sort_value: 'asc' | 'desc') => {
    return async (dispatch: Dispatch<GlobalAction>) => {
        try {
            dispatch({type: GlobalActionTypes.FETCH_GLOBAL_SORT_VALUE, payload: sort_value})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

export const fetchSortField = (sort_field: string) => {
    return async (dispatch: Dispatch<GlobalAction>) => {
        try {
            dispatch({type: GlobalActionTypes.FETCH_GLOBAL_SORT_FIELD, payload: sort_field})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

export const fetchPage = (page: number) => {
    return async (dispatch: Dispatch<GlobalAction>) => {
        try {
            dispatch({type: GlobalActionTypes.FETCH_GLOBAL_PAGE, payload: {page}})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

export const fetchNumberOfPage = (type: string) => {
    return async (dispatch: Dispatch<GlobalAction>, getState: any) => {
        try {
            const {user} = getState()
            const {global} = getState()
            const {count} = global
            const {token} = user.currentUser

            const config = {
                "headers": {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    count,
                }
            };
            if(type === "LaptopModel")
            {
                const response = await axios.get("http://localhost:5000/laptopmodels/number/")
                dispatch({type: GlobalActionTypes.FETCH_GLOBAL_MAXPAGE, payload: {maxpage: response.data}})
            }
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

export const fetchCount = (count: string) => {
    return async (dispatch: Dispatch<GlobalAction>) => {
        try {
            dispatch({type: GlobalActionTypes.FETCH_GLOBAL_COUNT, payload: {count}})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

export const fetchFilterType = (filterType: string) => {
    return async (dispatch: Dispatch<GlobalAction>, getState: any) => {
        try {
            console.log(filterType)
            const {global} = getState();
            const {GlobalStateInfo} = global

            if(GlobalStateInfo.filterType === filterType){
                dispatch({type: GlobalActionTypes.FETCH_FILTER_TYPE, payload: ""})
                return;
            }

            dispatch({type: GlobalActionTypes.FETCH_FILTER_TYPE, payload: filterType})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: GlobalActionTypes.FETCH_GLOBAL_ERROR,
                payload: "Error when loading Global"})
        }
    }
}

