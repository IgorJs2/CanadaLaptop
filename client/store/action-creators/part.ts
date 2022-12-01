import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {PartsAction, PartsActionTypes} from "../../types/parts";
import {PartModelAction, PartModelActionTypes} from "../../types/partsmodel";
import {IPartModelFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_IPartModel";
import {IPartFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_IPart";
import {GlobalActionTypes} from "../../types/globalState";


export const fetchPart = (token: string, count?: number, page?: number) => {
    return async (dispatch: Dispatch<PartsAction>, getState: any) => {
        try {
            const {user} = getState()
            const {currentUser} = user
            const token_ = currentUser.token

            let config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (token || token_)
                },
                params: {}
            };

            if(count && page){
                // @ts-ignore
                config.params["count"] = count
                // @ts-ignore
                config.params["offset"] = page * count
                const response = await axios.get("http://localhost:5000/parts/", config)
                dispatch({type: PartsActionTypes.FETCH_PARTS, payload: response.data})
            }
            else {
                const response = await axios.get("http://localhost:5000/parts/", config)
                dispatch({type: PartsActionTypes.FETCH_PARTS, payload: response.data})
            }
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: PartsActionTypes.FETCH_PARTS_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: PartsActionTypes.FETCH_PARTS_ERROR,
                payload: "Error when loading part"})
        }
    }
}

export const fetchFilteredPart = (filterValue: IPartFilterData, token?: string) => {
    return async (dispatch: Dispatch<PartsAction>, getState: any) => {
        try {
            const {global, user} = getState()
            const {GlobalStateInfo} = global
            const {currentUser} = user

            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (token || currentUser.token)
                },
                params: {
                    count: GlobalStateInfo.count,
                    offset: GlobalStateInfo.count * GlobalStateInfo.page,
                    filter: JSON.stringify({...filterValue})
                }
            };

            const response = await axios.get("http://localhost:5000/parts/filtered/", config)
            if(response.data && response.data[0]){
                dispatch({type: PartsActionTypes.FETCH_PARTS, payload: response.data})
            }
        } catch (e: any | AxiosError) {
            console.log(e)
            if(e && e.response.status == 401){
                dispatch({
                    type: PartsActionTypes.FETCH_PARTS_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: PartsActionTypes.FETCH_PARTS_ERROR,
                payload: "Error when loading part models"})
        }
    }
}

export const fetchQueryPart = (token: string, query: object) => {
    return async (dispatch: Dispatch<PartsAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
                params: {
                    query: JSON.stringify(query)
                }
            };
            const response = await axios.get("http://localhost:5000/parts/", config)
            dispatch({type: PartsActionTypes.FETCH_PARTS, payload: response.data})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: PartsActionTypes.FETCH_PARTS_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: PartsActionTypes.FETCH_PARTS_ERROR,
                payload: "Error when loading part"})
        }
    }
}




// export const fetchStatusParts = (token: string, status: string) => {
//     return async (dispatch: Dispatch<PartsAction>) => {
//         try {
//             const config = {
//                 "headers": {
//                     "Authorization": "Bearer" + " " + token
//                 },
//                 params: {
//                     status
//                 }
//             };
//             const response = await axios.get("http://localhost:5000/parts/status", config)
//             dispatch({type: PartsActionTypes.FETCH_NEEDRETURNPARTS, payload: response.data})
//         } catch (e: any | AxiosError) {
//             if(e && e.response.status == 401){
//                 dispatch({
//                     type: PartsActionTypes.FETCH_PARTS_ERROR,
//                     payload: e.response.data.message})
//                 return 0
//             }
//             dispatch({
//                 type: PartsActionTypes.FETCH_PARTS_ERROR,
//                 payload: "Error when loading part"})
//         }
//     }
// }

