import {Dispatch} from "react";
import {InvoiceAction, InvoiceActionTypes} from "../../types/invoice";
import axios from "axios";

export const fetchInvoice = (token: string, id: string) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                },
                params: {
                    id
                }
            };
            const response = await axios.get(`http://localhost:5000/invoice/info`, config)
            dispatch({type: InvoiceActionTypes.FETCH_INVOICE, payload: response.data})
        } catch (e) {
            dispatch({
                type: InvoiceActionTypes.FETCH_INVOICE_ERROR,
                payload: 'Произошла ошибка при получении invoice'})
        }
    }
}

export const fetchInvoices = (token: string) => {
    return async (dispatch: Dispatch<InvoiceAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get(`http://localhost:5000/invoice`, config)
            dispatch({type: InvoiceActionTypes.FETCH_INVOICES, payload: response.data})
        } catch (e) {
            dispatch({
                type: InvoiceActionTypes.FETCH_INVOICE_ERROR,
                payload: 'Произошла ошибка при получении invoice'})
        }
    }
}
