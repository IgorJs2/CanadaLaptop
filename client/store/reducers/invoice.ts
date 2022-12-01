import {InvoiceAction, InvoiceActionTypes, InvoiceState} from "../../types/invoice";


const initialState: InvoiceState = {
    Invoices: [],
    InvoiceInfo: {
        _id: "",
        from: "",
        to: "",
        title: "",
        ebayList: "",
        price: 0,
        createdByUserId: {_id: "", full_name: ""},
        createdAt: ""
    },
    error: ''
}

export const InvoiceReducer = (state = initialState, action: InvoiceAction): InvoiceState => {
    switch (action.type) {
        case InvoiceActionTypes.FETCH_INVOICE_ERROR:
            return {...state, error: action.payload}
        case InvoiceActionTypes.FETCH_INVOICE:
            return {...state, InvoiceInfo: action.payload}
        case InvoiceActionTypes.FETCH_INVOICES:
            return {...state, Invoices: action.payload}
        default:
            return state
    }
}