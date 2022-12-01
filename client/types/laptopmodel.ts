import {PriorityCategory} from "../constants/global_const";

export interface ILaptopModel {
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

export function isAnLaptopModel(obj: any): obj is ILaptopModel {
    return'_id' in obj &&
        'name' in obj &&
        'searchID' in obj &&
        'price' in obj &&
        'profit' in obj &&
        'amount_paid' in obj &&
        'defects' in obj &&
        'description' in obj &&
        'moneybackdays' in obj
}

export interface ILaptopModelListItem{
    _id: string,
    searchID: string,
    name: string,
}

export interface ILaptopPriorityModel {
    model: string,
    profit: number,
    quantity: number,
    count: number
    best_category: PriorityCategory
}

export interface LaptopModelState {
    LaptopModels: ILaptopModel[],
    LaptopModelList: ILaptopModelListItem[];
    Priority: ILaptopPriorityModel[],
    LaptopModelInfo: ILaptopModel
    error: string;
}

export enum LaptopModelActionTypes {
    FETCH_LAPTOPMODEL = 'FETCH_LAPTOPMODEL',
    FETCH_LAPTOPMODELS = 'FETCH_LAPTOPMODELS',
    FETCH_LAPTOPMODEL_LIST_ITEMS = 'FETCH_LAPTOPMODEL_LIST_ITEMS',
    FETCH_PRIORITY = "FETCH_PRIORITY",
    FETCH_LAPTOPMODEL_ERROR = 'FETCH_LAPTOPMODEL_ERROR',
}

interface FetchLaptopModelAction {
    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL;
    payload: ILaptopModel
}

interface FetchLaptopModelsAction {
    type: LaptopModelActionTypes.FETCH_LAPTOPMODELS;
    payload: ILaptopModel[]
}

interface FetchPriorityAction {
    type: LaptopModelActionTypes.FETCH_PRIORITY;
    payload: ILaptopPriorityModel[]
}


interface FetchLaptopModelListItems {
    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_LIST_ITEMS;
    payload: ILaptopModelListItem[]
}

interface FetchLaptopModelErrorAction {
    type: LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR;
    payload: string
}

export type LaptopModelAction = FetchLaptopModelAction | FetchLaptopModelErrorAction | FetchPriorityAction | FetchLaptopModelListItems  | FetchLaptopModelsAction
