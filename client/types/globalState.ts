import {IPartFilterData} from "../components/Sidebar/childrens/filters/Sidebar_IPart";
import {ILaptopFilterData} from "../components/Sidebar/childrens/filters/Sidebar_ILaptop";
import {ILaptopModelFilterData} from "../components/Sidebar/childrens/filters/Sidebar_ILaptopModel";
import {IPartModelFilterData} from "../components/Sidebar/childrens/filters/Sidebar_IPartModel";

export interface IGlobal {
    filter: boolean,
    filterType: string,
    filterValue: IPartFilterData | ILaptopFilterData | ILaptopModelFilterData | IPartModelFilterData,
    sort_field: string,
    sort_value: 'asc' | 'desc',
    maxpage: number,
    count: number,
    page: number
}

export interface GlobalState {
    GlobalStateInfo: IGlobal;
    error: string;
}

export enum GlobalActionTypes {
    FETCH_GLOBAL_FILTER = 'FETCH_GLOBAL_FILTER',
    FETCH_GLOBAL_MAXPAGE = 'FETCH_GLOBAL_MAXPAGE',
    FETCH_GLOBAL_COUNT = "FETCH_GLOBAL_COUNT",
    FETCH_GLOBAL_PAGE = "FETCH_GLOBAL_PAGE",
    FETCH_GLOBAL_SORT_FIELD = "FETCH_GLOBAL_SORT_FIELD",
    FETCH_GLOBAL_SORT_VALUE = "FETCH_GLOBAL_SORT_VALUE",
    FETCH_GLOBAL_SEARCH_OPTIONS = "FETCH_GLOBAL_SEARCH_OPTIONS",
    FETCH_FILTER_TYPE = 'FETCH_FILTER_TYPE',
    FETCH_GLOBAL_ERROR = 'FETCH_GLOBAL_ERROR',
}

interface FetchGlobalErrorAction {
    type: GlobalActionTypes.FETCH_GLOBAL_ERROR;
    payload: string
}

interface FetchGlobalSearchOptionsAction {
    type: GlobalActionTypes.FETCH_GLOBAL_SEARCH_OPTIONS;
    payload: { count: number, page: number}
}

interface FetchGlobalSortValueAction {
    type: GlobalActionTypes.FETCH_GLOBAL_SORT_VALUE
    payload: 'asc' | 'desc'
}

interface FetchGlobalSortFieldAction {
    type: GlobalActionTypes.FETCH_GLOBAL_SORT_FIELD
    payload: string
}

interface FetchGlobalCountAction {
    type: GlobalActionTypes.FETCH_GLOBAL_COUNT;
    payload: {
        count: number
    }
}

interface FetchGlobalPageAction {
    type: GlobalActionTypes.FETCH_GLOBAL_PAGE;
    payload: {
        page: number
    }
}

interface FetchGlobalMaxPageAction {
    type: GlobalActionTypes.FETCH_GLOBAL_MAXPAGE;
    payload: {
        maxpage: number
    }
}

interface FetchGlobalFilterAction {
    type: GlobalActionTypes.FETCH_GLOBAL_FILTER;
    payload: {
        filter: boolean
        filterValue: object,
    }
}


interface FetchGlobalFilterTypeAction {
    type: GlobalActionTypes.FETCH_FILTER_TYPE;
    payload: string
}

export type GlobalAction =
    FetchGlobalFilterAction | FetchGlobalErrorAction | FetchGlobalMaxPageAction | FetchGlobalSortValueAction | FetchGlobalSortFieldAction |
    FetchGlobalFilterTypeAction | FetchGlobalSearchOptionsAction | FetchGlobalPageAction | FetchGlobalCountAction
