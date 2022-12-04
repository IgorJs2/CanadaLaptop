
export interface ILaptop {
    _id: string
    searchID: string,
    img: string[],
    model: string,
    daysfrompaym: number,
    price: number,
    profit: number,
    amount_paid: number,
    item_status: number,
    title: string,
    category: string[],
    description: string,
    tracknumber: string,
    ebaylist: string,
    moneybackdays: number,
    _createdBy: { full_name: string },
    _createdAt: string,
}

export function isAnLaptop(obj: any): obj is ILaptop {
    return'_id' in obj &&
        'searchID' in obj &&
        'img' in obj &&
        'model' in obj &&
        'daysfrompaym' in obj &&
        'price' in obj &&
        'profit' in obj &&
        'amount_paid' in obj &&
        'item_status' in obj &&
        'title' in obj &&
        'category' in obj &&
        'description' in obj &&
        'tracknumber' in obj &&
        'ebaylist' in obj &&
        'moneybackdays' in obj &&
        '_createdBy' in obj &&
        '_createdAt' in obj
}

export interface ILaptopListItem{
    _id: string,
    searchID: string,
    title: string,
}

export interface LaptopState {
    Laptops: ILaptop[];
    LaptopList: ILaptopListItem[]
    LaptopInfo: ILaptop;
    error: string;
}

export enum LaptopActionTypes {
    FETCH_LAPTOPS = 'FETCH_LAPTOPS',
    FETCH_LAPTOP_LIST_ITEMS = "FETCH_LAPTOP_LIST_ITEMS",
    FETCH_LAPTOP_INFO = 'FETCH_LAPTOP_INFO',
    FETCH_LAPTOP_ERROR = 'FETCH_LAPTOP_ERROR',
}

interface FetchLaptopsAction {
    type: LaptopActionTypes.FETCH_LAPTOPS;
    payload: ILaptop[]
}

interface FetchLaptopInfoAction {
    type: LaptopActionTypes.FETCH_LAPTOP_INFO;
    payload: ILaptop
}

interface FetchLaptopListAction {
    type: LaptopActionTypes.FETCH_LAPTOP_LIST_ITEMS;
    payload: ILaptopListItem[]
}

interface FetchLaptopErrorAction {
    type: LaptopActionTypes.FETCH_LAPTOP_ERROR;
    payload: string
}

export type LaptopAction = FetchLaptopsAction | FetchLaptopInfoAction | FetchLaptopErrorAction | FetchLaptopListAction