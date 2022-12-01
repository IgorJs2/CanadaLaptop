import {Dispatch} from "react";
import axios, {AxiosError} from "axios";
import {LaptopAction, LaptopActionTypes} from "../../types/laptop";
import {LaptopModelAction, LaptopModelActionTypes} from "../../types/laptopmodel";
import {ILaptopFilterData} from "../../components/Sidebar/childrens/filters/Sidebar_ILaptop";
import {ILaptopModelEditData} from "../../components/Forms/childrens/laptopmodel/edit-form";

export const fetchLaptop = (token: string, count: number, page: number) => {
    return async (dispatch: Dispatch<LaptopAction>, getState: any) => {
        try {
            const {user} = getState()
            const {currentUser} = user
            const token_ = currentUser.token

            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (token || token_)
                },
                params: {
                    count: count,
                    offset: count * page
                }
            };
            const response = await axios.get("http://localhost:5000/laptop/", config)
            dispatch({type: LaptopActionTypes.FETCH_LAPTOPS, payload: response.data})
        } catch (e: any | AxiosError) {
           console.log(e)
            dispatch({
                type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
                payload: "Error when loading Laptop" + e})
        }
    }
}

export const fetchFilteredLaptop = (filterValue?: ILaptopFilterData, token?: string) => {
    return async (dispatch: Dispatch<LaptopAction>, getState: any) => {
        try {
            console.log(filterValue)
            const {global, user} = getState()
            const {GlobalStateInfo} = global
            const {currentUser} = user
            const token_ = currentUser.token
            const {count, page} = GlobalStateInfo

            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + (token_ || token)
                },
                params: {
                    count: count,
                    offset: count * page,
                    filter: JSON.stringify({...filterValue})
                }
            };

            const response = await axios.get("http://localhost:5000/laptop/filtered/", config)
            dispatch({type: LaptopActionTypes.FETCH_LAPTOPS, payload: response.data})
        } catch (e) {
            console.log(e)
            dispatch({
                type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
                payload: "Error when loading Laptop models"})
        }
    }
}

export const fetchLaptopsFromIdArray = (id_array: string[], token: string) => {
    return async (dispatch: Dispatch<LaptopAction>, getState: any) => {
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

            const response = await axios.get("http://localhost:5000/laptop/by_id", config)
            dispatch({type: LaptopActionTypes.FETCH_LAPTOPS, payload: response.data})
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}
export const fetchLaptopEditFromList = (new_item_array: ILaptopModelEditData[], token?: string) => {
    return async (dispatch: Dispatch<LaptopAction>, getState: any) => {
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
            const response = await axios.put(`http://localhost:5000/laptop/edit_from_list`, body, config)
            dispatch({type: LaptopActionTypes.FETCH_LAPTOP_LIST_ITEMS, payload: response.data})
        } catch (e: any | AxiosError) {
            console.log(e)
            if (e && e.response.status == 401) {
                dispatch({
                    type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
                    payload: e.response.data.message
                })
                return 0
            }
            dispatch({
                type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
                payload: "Error when loading Laptop models"
            })
        }
    }
}


// export const fetchLaptopInfo = (token: string, id: string) => {
//     return async (dispatch: Dispatch<LaptopAction>) => {
//         try {
//             const config = {
//                 "headers": {
//                     "Authorization": "Bearer" + " " + token
//                 },
//                 params: {
//                     id
//                 }
//             };
//             const response = await axios.get("http://localhost:5000/laptop/", config)
//             dispatch({type: LaptopActionTypes.FETCH_LAPTOP_INFO, payload: response.data})
//         } catch (e: any | AxiosError) {
//             if(e && e.response.status == 401){
//                 dispatch({
//                     type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
//                     payload: e.response.data.message})
//                 return 0
//             }
//             dispatch({
//                 type: LaptopActionTypes.FETCH_LAPTOP_ERROR,
//                 payload: "Error when loading Laptop"})
//         }
//     }
// }
