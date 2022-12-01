import {ILaptopModel} from "./laptopmodel";

export interface IPartModel {
    _id: string,
    searchID: string,
    name: string,
    price: number,
    profit: number,
    amount_paid: number,
    _laptop_model_id: { searchID: string },
    part_number: string,
    mpn: string,
}

export function isAnPartModel(obj: any): obj is ILaptopModel {
    return'_id' in obj &&
        'searchID' in obj &&
        'name' in obj &&
        'price' in obj &&
        'profit' in obj &&
        'amount_paid' in obj &&
        '_laptop_model_id' in obj &&
        'part_number' in obj &&
        'mpn' in obj
}


export interface PartModelState {
    PartModels: IPartModel[];
    PartModelInfo: IPartModel;
    error: string;
}

export enum PartModelActionTypes {
    FETCH_PARTMODEL_INFO = 'FETCH_PARTMODEL_INFO',
    FETCH_PARTMODELS = 'FETCH_PARTMODELS',
    FETCH_PARTMODEL_ERROR = 'FETCH_PARTMODEL_ERROR',
}

interface FetchPartModelInfoAction {
    type: PartModelActionTypes.FETCH_PARTMODEL_INFO;
    payload: IPartModel
}

interface FetchPartModelsAction {
    type: PartModelActionTypes.FETCH_PARTMODELS;
    payload: IPartModel[]
}

interface FetchPartModelErrorAction {
    type: PartModelActionTypes.FETCH_PARTMODEL_ERROR;
    payload: string
}

export type PartModelAction = FetchPartModelInfoAction | FetchPartModelErrorAction | FetchPartModelsAction