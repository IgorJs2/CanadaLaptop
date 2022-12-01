export interface IInvoice {
    _id: string,
    from: string,
    to: string,
    title: string,
    ebayList: string,
    price: number,
    createdByUserId: { _id: string, full_name: string },
    createdAt: string
}


export interface InvoiceState {
    Invoices: IInvoice[]
    InvoiceInfo: IInvoice;
    error: string;
}

export enum InvoiceActionTypes {
    FETCH_INVOICES = "FETCH_INVOICES",
    FETCH_INVOICE = 'FETCH_INVOICE',
    FETCH_INVOICE_ERROR = 'FETCH_INVOICE_ERROR',
}

interface FetchInvoicesAction {
    type: InvoiceActionTypes.FETCH_INVOICES,
    payload: IInvoice[];
}

interface FetchInvoiceAction {
    type: InvoiceActionTypes.FETCH_INVOICE;
    payload: IInvoice
}

interface FetchInvoiceErrorAction {
    type: InvoiceActionTypes.FETCH_INVOICE_ERROR;
    payload: string
}

export type InvoiceAction = FetchInvoiceAction | FetchInvoiceErrorAction | FetchInvoicesAction