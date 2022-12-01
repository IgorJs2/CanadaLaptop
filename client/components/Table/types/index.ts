import {IInvoice} from "../../../types/invoice";
import {IRole} from "../../../types/role";
import {IOrder} from "../../../types/order";
import {ILaptop} from "../../../types/laptop";


interface TableData{
    partmodels: PartModelsTableData
    parts: PartsTableData
    laptop: LaptopsTableData,
    laptopmodels: LaptopModelsTableData
    invoice: InvoicesTableDate,
    order: OrdersTableDate
    mail: MailsTableData
}

interface HeadCell {
    partmodels: PartModelsHeadCell[]
    parts: PartsHeadCell[]
    laptop: LaptopsHeadCell[],
    laptopmodels: LaptopModelsHeadCell[]
    invoice: InvoicesHeadCell[],
    order: OrdersHeadCell[]
    mail: MailsHeadCell[]
}


// START_TYPED_TABLEDATA

interface PartModelsTableData {
    searchID: string,
    name: string,
    price: number,
    profit: number,
    amount_paid: number,
    _laptop_modelID: string,
    part_number: string,
    mpn: string,
}

interface PartsTableData {
    searchID: string,
    img: string[],
    _laptopID: string,
    _laptopSearchID: string,
    price: number,
    amount_paid: number,
    profit: number,
    item_status: {color: string, number: number, value: string},
    title: string,
    category: string[]
    description: string,
    ebaylist: string,
    _createdBy: string,
    _createdAt: string,
}


interface LaptopsTableData extends ILaptop{}

interface MailsTableData {
    name: string,
    status: string,
    details: string,
    date: string
}

interface LaptopModelsTableData{
    _id: string,
    searchID: string,
    name: string,
    price: number,
    profit: number,
    amount_paid: number,
    defects: string[],
    description: string,
    moneybackdays: number,
}

interface UsersTableData {
    login: string,
    type: string,
    avatar: string,
    full_name: string,
    email: string,
    mobile: string,
    _role: object,
    _time: string[],
}

interface PermissionTableData{
    permission: string,
    active: boolean
}

interface RolesTableDate extends IRole {}

interface InvoicesTableDate extends IInvoice{}

interface OrdersTableDate extends IOrder{}

// END_TYPED_TABLEDATA


// START_TYPED_HEADCELL

interface IBaseHeadCell{
    disablePadding: boolean;
    label: string;
    numeric: boolean;
}

interface PartModelsHeadCell extends IBaseHeadCell{
    id: keyof PartModelsTableData;
}

interface PartsHeadCell extends IBaseHeadCell{
    id: keyof PartsTableData;
}

interface LaptopsHeadCell extends IBaseHeadCell{
    id: keyof LaptopsTableData;
}


interface MailsHeadCell extends IBaseHeadCell{
    id: keyof MailsTableData;
}

interface LaptopModelsHeadCell extends IBaseHeadCell{
    id: keyof LaptopModelsTableData;
}

interface UsersHeadCell extends IBaseHeadCell{
    id: keyof UsersTableData;
}

interface PermissionHeadCell extends IBaseHeadCell{
    id: keyof PermissionTableData;
}

interface RolesHeadCell extends IBaseHeadCell{
    id: keyof RolesTableDate;
}

interface InvoicesHeadCell extends IBaseHeadCell{
    id: keyof InvoicesTableDate;
}

interface OrdersHeadCell extends IBaseHeadCell{
    id: keyof OrdersTableDate;
}

// END_TYPED_HEADCELL

type Order = 'asc' | 'desc';

export type {TableData, HeadCell, MailsTableData, MailsHeadCell, PartModelsHeadCell, LaptopsTableData, LaptopsHeadCell, PartModelsTableData,
    PartsTableData, PartsHeadCell, Order, RolesHeadCell, PermissionHeadCell, UsersHeadCell, PermissionTableData, UsersTableData, RolesTableDate,
    LaptopModelsHeadCell, LaptopModelsTableData , InvoicesHeadCell, OrdersHeadCell}