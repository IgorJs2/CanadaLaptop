import {Dispatch} from "react";
import {OrderAction, OrderActionTypes} from "../../types/order";
import axios from "axios";

export const fetchOrder = (token: string, id: string) => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
                params: {
                    id
                }
            };
            const response = await axios.get(`http://localhost:5000/order/info`, config)
            dispatch({type: OrderActionTypes.FETCH_ORDER, payload: response.data})
        } catch (e) {
            dispatch({
                type: OrderActionTypes.FETCH_ORDER_ERROR,
                payload: 'Произошла ошибка при получении order'})
        }
    }
}

export const fetchOrders = (token: string) => {
    return async (dispatch: Dispatch<OrderAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
            };
            const response = await axios.get(`http://localhost:5000/order`, config)
            dispatch({type: OrderActionTypes.FETCH_ORDERS, payload: response.data})
        } catch (e) {
            dispatch({
                type: OrderActionTypes.FETCH_ORDER_ERROR,
                payload: 'Произошла ошибка при получении order'})
        }
    }
}
