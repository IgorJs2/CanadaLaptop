export interface IOrder {
    _id: string,
    laptop_id: { searchID: string },
    part_id: { searchID: string },
    customerName: string,
    customerShippingAdress: string,
    tracknumber: string,
    price: string,
    createdByUserId: { full_name: string, _id: string },
    createdAt: string,
}


export interface OrderState {
    Orders: IOrder[];
    OrderInfo: IOrder;
    error: string;
}

export enum OrderActionTypes {
    FETCH_ORDERS = "FETCH_ORDERS",
    FETCH_ORDER = 'FETCH_ORDER',
    FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR',
}

interface FetchOrdersAction {
    type: OrderActionTypes.FETCH_ORDERS;
    payload: IOrder[]
}

interface FetchOrderAction {
    type: OrderActionTypes.FETCH_ORDER;
    payload: IOrder
}

interface FetchOrderErrorAction {
    type: OrderActionTypes.FETCH_ORDER_ERROR;
    payload: string
}

export type OrderAction = FetchOrderAction | FetchOrderErrorAction | FetchOrdersAction