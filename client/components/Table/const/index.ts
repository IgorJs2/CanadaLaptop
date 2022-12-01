import {
    HeadCell, InvoicesHeadCell, LaptopModelsHeadCell,
    LaptopsHeadCell,
    MailsHeadCell, OrdersHeadCell,
    PartModelsHeadCell,
    PartsHeadCell, PermissionHeadCell, RolesHeadCell,
    TableData,
    UsersHeadCell, UsersTableData
} from "../types";

export const numberPerPage = [10, 25, 50, 100, 200, 500]

export const PartModelsCells: readonly PartModelsHeadCell[] = [
    {
        id: 'searchID',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price ($)',
    },
    {
        id: 'profit',
        numeric: true,
        disablePadding: false,
        label: 'Profit ($)',
    },
    {
        id: 'amount_paid',
        numeric: true,
        disablePadding: false,
        label: 'Amount Paid ($)',
    },
    {
        id: '_laptop_modelID',
        numeric: true,
        disablePadding: false,
        label: 'Laptop_ID',
    },
    {
        id: 'part_number',
        numeric: true,
        disablePadding: false,
        label: 'Part Number',
    },
    {
        id: 'mpn',
        numeric: true,
        disablePadding: false,
        label: 'MPN',
    },
];

export const PartsCells: readonly PartsHeadCell[] = [
    {
        id: 'searchID',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'img',
        numeric: true,
        disablePadding: false,
        label: 'Img',
    },
    {
        id: '_laptopSearchID',
        numeric: true,
        disablePadding: false,
        label: 'Laptop ID',
    },
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: 'Title',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price ($)',
    },
    {
        id: 'amount_paid',
        numeric: true,
        disablePadding: false,
        label: 'Amount Paid ($)',
    },
    {
        id: 'item_status',
        numeric: true,
        disablePadding: false,
        label: 'Item Status',
    },
    {
        id: 'category',
        numeric: true,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'description',
        numeric: true,
        disablePadding: false,
        label: 'Item Description',
    },
    {
        id: 'ebaylist',
        numeric: true,
        disablePadding: false,
        label: 'Ebay list',
    },
    {
        id: '_createdBy',
        numeric: true,
        disablePadding: false,
        label: '_createdBy',
    },
    {
        id: '_createdAt',
        numeric: true,
        disablePadding: false,
        label: '_createdAt',
    },
];


export const LaptopsCells: readonly LaptopsHeadCell[] = [
    {
        id: 'searchID',
        numeric: true,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'img',
        numeric: false,
        disablePadding: false,
        label: 'Img',
    },
    {
        id: "model",
        numeric: false,
        disablePadding: false,
        label: 'Model',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price ($)',
    },
    {
        id: 'profit',
        numeric: true,
        disablePadding: false,
        label: 'Profit ($)',
    },
    {
        id: 'amount_paid',
        numeric: true,
        disablePadding: false,
        label: 'Amount Paid ($)',
    },
    {
        id: 'item_status',
        numeric: true,
        disablePadding: false,
        label: 'Item Status',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Title',
    },
    {
        id: 'category',
        numeric: false,
        disablePadding: false,
        label: 'Category',
    },
    {
        id: 'decription',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'tracknumber',
        numeric: false,
        disablePadding: false,
        label: 'TrackNumber',
    },
    {
        id: 'ebay_list',
        numeric: false,
        disablePadding: false,
        label: 'EbayList',
    },
    {
        id: 'daysfrompaym',
        numeric: true,
        disablePadding: false,
        label: 'Days from paym',
    },
    {
        id: 'moneybackdays',
        numeric: true,
        disablePadding: false,
        label: 'Money Back Days',
    },
    {
        id: '_createdBy',
        numeric: false,
        disablePadding: false,
        label: '_createdBy',
    },
    {
        id: '_createdAt',
        numeric: false,
        disablePadding: false,
        label: '_createdAt',
    },
];

export const MailsCells: readonly MailsHeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: true,
        label: 'Status',
    },
    {
        id: 'details',
        numeric: false,
        disablePadding: true,
        label: 'Details',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'Date',
    },
];

export const LaptopModelsCells: readonly LaptopModelsHeadCell[] = [
    {
        id: 'searchID',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: true,
        label: 'Price',
    },
    {
        id: 'profit',
        numeric: false,
        disablePadding: true,
        label: 'Profit',
    },
    {
        id: 'amount_paid',
        numeric: false,
        disablePadding: true,
        label: 'Amount Paid',
    },
    {
        id: 'defects',
        numeric: false,
        disablePadding: true,
        label: 'Defect list',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: true,
        label: 'Description',
    },
    {
        id: 'moneybackdays',
        numeric: false,
        disablePadding: true,
        label: 'Money Back',
    },
]


export const UsersCells: readonly UsersHeadCell[] = [
    {
        id: 'avatar',
        numeric: false,
        disablePadding: true,
        label: 'Avatar',
    },
    {
        id: "full_name",
        numeric: false,
        disablePadding: true,
        label: 'Full Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
    },
    {
        id: 'mobile',
        numeric: false,
        disablePadding: true,
        label: 'Mobile',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: true,
        label: 'Type',
    },
    {
        id: '_role',
        numeric: false,
        disablePadding: true,
        label: 'Roles',
    },
    {
        id: '_time',
        numeric: false,
        disablePadding: true,
        label: 'Times',
    },
]

export const RolesCells: readonly RolesHeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: "_permissions",
        numeric: false,
        disablePadding: true,
        label: 'Permission list',
    },
    {
        id: "active",
        numeric: false,
        disablePadding: true,
        label: 'Active',
    },
]

export const PermissionsCells: readonly PermissionHeadCell[] = [
    {
        id: 'permission',
        numeric: false,
        disablePadding: true,
        label: 'Permission name',
    },
    {
        id: "active",
        numeric: false,
        disablePadding: true,
        label: 'Active',
    },
]

export const InvoicesCells: readonly InvoicesHeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: "to",
        numeric: false,
        disablePadding: true,
        label: 'To',
    },
    {
        id: "ebayList",
        numeric: false,
        disablePadding: true,
        label: 'Ebay List',
    },
    {
        id: "price",
        numeric: false,
        disablePadding: true,
        label: 'Price',
    },
    {
        id: "createdBy",
        numeric: false,
        disablePadding: true,
        label: 'created_By',
    },
    {
        id: "createdAt",
        numeric: false,
        disablePadding: true,
        label: 'createdAt',
    },
]

export const OrdersCells: readonly OrdersHeadCell[] = [
    {
        id: 'laptop_id',
        numeric: false,
        disablePadding: true,
        label: 'Laptop ID',
    },
    {
        id: 'part_id',
        numeric: false,
        disablePadding: true,
        label: 'Part ID',
    },
    {
        id: 'customerName',
        numeric: false,
        disablePadding: true,
        label: 'Customer Name',
    },
    {
        id: 'customerShippingAdress',
        numeric: false,
        disablePadding: true,
        label: 'Customer Shipping Adress',
    },
    {
        id: 'tracknumber',
        numeric: false,
        disablePadding: true,
        label: 'TrackNumber',
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: true,
        label: 'Price',
    },
    {
        id: 'createdBy',
        numeric: false,
        disablePadding: true,
        label: 'createdBy',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: true,
        label: 'createdAt',
    }
]


//Select UI Part

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
