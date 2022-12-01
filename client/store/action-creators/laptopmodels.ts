import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {ILaptopModel, LaptopModelAction, LaptopModelActionTypes} from "../../types/laptopmodel";
import {ILaptopModelFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_ILaptopModel";
import {ILaptopModelEditData} from "../../components/Forms/childrens/laptopmodel/edit-form";

export const fetchLaptopModels = (token?: string, count: number, page: number) => {
    return async (dispatch: Dispatch<LaptopModelAction>, getState: any) => {
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
            const response = await axios.get("http://localhost:5000/laptopmodels/", config)
            dispatch({type: LaptopModelActionTypes.FETCH_LAPTOPMODELS, payload: response.data})
        } catch (e: any | AxiosError) {
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

export const fetchLaptopModelList = (filterValue: ILaptopModelFilterData, token?: string) => {
    return async (dispatch: Dispatch<LaptopModelAction>, getState: any) => {
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
            const response = await axios.get("http://localhost:5000/laptopmodels/list", config)
            dispatch({type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_LIST_ITEMS, payload: response.data})
        } catch (e: any | AxiosError) {
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

export const fetchLaptopModelsFromIdArray = (id_array: string[], token: string) => {
    return async (dispatch: Dispatch<LaptopModelAction>, getState: any) => {
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
            dispatch({type: LaptopModelActionTypes.FETCH_LAPTOPMODELS, payload: response.data})
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

export const fetchFilteredLaptopModels = (filterValue: ILaptopModelFilterData, token?: string,) => {
    return async (dispatch: Dispatch<LaptopModelAction>, getState: any) => {
        try {
            const {global, user} = getState()
            const {GlobalStateInfo} = global
            const {currentUser} = user

            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (currentUser.token || token)
                },
                params: {
                    count: GlobalStateInfo.count,
                    offset: GlobalStateInfo.count * GlobalStateInfo.page,
                    filter: JSON.stringify({...filterValue})
                }
            };

            const response = await axios.get("http://localhost:5000/laptopmodels/filtered/", config)
            if (response.data && response.data[0]) {
                dispatch({type: LaptopModelActionTypes.FETCH_LAPTOPMODELS, payload: response.data})
            }
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

export const fetchPriorityLaptopModels = (token: string) => {
    return async (dispatch: Dispatch<LaptopModelAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
            };
            const response = await axios.get("http://localhost:5000/laptopmodels/get_priority", config)
            dispatch({type: LaptopModelActionTypes.FETCH_PRIORITY, payload: response.data})
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

export const fetchLaptopModelEditFromList = (new_item_array: ILaptopModelEditData[], token?: string) => {
    return async (dispatch: Dispatch<LaptopModelAction>, getState: any) => {
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
            dispatch({type: LaptopModelActionTypes.FETCH_LAPTOPMODELS, payload: response.data})
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}

// export const fetchLaptopModelInfo = () => {
//     return async (dispatch: Dispatch<LaptopModelAction>, getState: any) => {
//
//         const {user} = getState()
//         const {currentUser} = user
//         const token_ = currentUser.token
//
//         try {
//             const config = {
//                 "headers": {
//                     "Authorization": "Bearer" + " " + token_
//                 },
//             };
//             const response = await axios.get(`http://localhost:5000/laptopmodels`, config)
//             dispatch({type: LaptopModelActionTypes.FETCH_LAPTOPMODELS, payload: response.data})
//         } catch (e: any | AxiosError) {
//             console.log(e)
//             if (e && e.response.status == 401) {
//                 dispatch({
//                     type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
//                     payload: e.response.data.message
//                 })
//                 return 0
//             }
//             dispatch({
//                 type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR,
//                 payload: "Error when loading Laptop models"
//             })
//         }
//     }
// }
