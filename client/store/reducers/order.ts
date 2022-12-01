import {OrderAction, OrderActionTypes, OrderState} from "../../types/order";


const initialState: OrderState = {
    Orders: [],
    OrderInfo: {
        _id: "",
        laptop_id: { searchID: "" },
        part_id: { searchID: "" },
        customerName: "",
        customerShippingAdress: "",
        tracknumber: "",
        price: "",
        createdByUserId: { full_name: "", _id: "" },
        createdAt: "",
    },
    error: ''
}

export const OrderReducer = (state = initialState, action: OrderAction): OrderState => {
    switch (action.type) {
        case OrderActionTypes.FETCH_ORDER_ERROR:
            return {...state, error: action.payload}
        case OrderActionTypes.FETCH_ORDER:
            return {...state, OrderInfo: action.payload}
        case OrderActionTypes.FETCH_ORDERS:
            return {...state, Orders: action.payload}
        default:
            return state
    }
}