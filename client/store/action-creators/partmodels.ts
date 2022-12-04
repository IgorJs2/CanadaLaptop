import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {PartModelAction, PartModelActionTypes} from "../../types/partsmodel";
import {IPartModelFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_IPartModel";
import {LaptopModelAction, LaptopModelActionTypes} from "../../types/laptopmodel";
import {ILaptopModelFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_ILaptopModel";
import {ILaptopModelEditData} from "../../components/Forms/childrens/laptopmodel/edit-form";
import {IPartModelEditData} from "../../components/Forms/childrens/partmodel/edit-form";

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

export const fetchPartModelList = (filterValue: IPartModelFilterData, token?: string) => {
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
                    filter: JSON.stringify({...filterValue})
                }
            };
            const response = await axios.get("http://localhost:5000/parts/list", config)
            dispatch({type: PartModelActionTypes.FETCH_PARTMODEL_LIST_ITEMS, payload: response.data})
        } catch (e: any | AxiosError) {
            if (e && e.response.status == 401) {
                dispatch({
                    type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

export const fetchPartModelsFromIdArray = (id_array: string[], token: string) => {
    return async (dispatch: Dispatch<PartModelAction>, getState: any) => {
        try {
            const {user} = getState()
            const {currentUser} = user

            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (currentUser.token || token)
                },
                params: {
                    id_array
                }
            };

            const response = await axios.get("http://localhost:5000/laptopmodels/by_id", config)
            dispatch({type: PartModelActionTypes.FETCH_PARTMODELS, payload: response.data})
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

export const fetchPartModelEditFromList = (new_item_array: IPartModelEditData[], token?: string) => {
    return async (dispatch: Dispatch<PartModelAction>, getState: any) => {
        try {
            const {user} = getState()
            const {currentUser} = user
            const token_ = currentUser.token


            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (token_ || token),
                }
            };
            const body = {
                items: JSON.stringify(new_item_array)
            }
            const response = await axios.put(`http://localhost:5000/laptopmodels/edit_from_list`, body, config)
            dispatch({type: PartModelActionTypes.FETCH_PARTMODELS, payload: response.data})
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: PartModelActionTypes.FETCH_PARTMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
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

