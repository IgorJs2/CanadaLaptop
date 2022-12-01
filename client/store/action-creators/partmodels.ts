import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {PartModelAction, PartModelActionTypes} from "../../types/partsmodel";
import {IPartModelFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_IPartModel";
import {LaptopModelActionTypes} from "../../types/laptopmodel";

export const fetchPartModels = (token: string, count: number, page: number) => {
    return async (dispatch: Dispatch<PartModelAction>, getState: any) => {
        try {
            const {user} = getState()
            const {currentUser} = user
            const token_ = currentUser.token

            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (token_ || token)
                },
                params: {
                    count: count,
                    offset: count * page
                }
            };
            const response = await axios.get("http://localhost:5000/partmodels/", config)
            dispatch({type: PartModelActionTypes.FETCH_PARTMODELS, payload: response.data})
        } catch (e: any | AxiosError) {
            if(e && e.response.status == 401){
                dispatch({
                    type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                payload: "Error when loading parts models"})
        }
    }
}

export const fetchFilteredPartModels = (filterValue: IPartModelFilterData, token?: string) => {
    return async (dispatch: Dispatch<PartModelAction>, getState: any) => {
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

            const response = await axios.get("http://localhost:5000/partmodels/filtered/", config)
            if(response.data && response.data[0]){
                dispatch({type: PartModelActionTypes.FETCH_PARTMODELS, payload: response.data})
            }
        } catch (e: any | AxiosError) {
            console.log(e)
            if(e && e.response.status == 401){
                dispatch({
                    type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                    payload: e.response.data.message})
                return 0
            }
            dispatch({
                type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                payload: "Error when loading part models"})
        }
    }
}

