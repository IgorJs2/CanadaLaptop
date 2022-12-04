
export interface IParts {
    _id: string,
    searchID: string,
    img: string[],
    _laptopID: string,
    _laptopSearchID: string,
    price: number,
    profit: number,
    amount_paid: number,
    item_status: number,
    title: string,
    category: string
    description: string,
    ebaylist: string,
    _createdBy: { full_name: string },
    _createdAt: string,
}

export function isAnPart(obj: any): obj is IParts {
    return'_id' in obj &&
        'searchID' in obj &&
        'img' in obj &&
        '_laptopID' in obj &&
        '_laptopSearchID' in obj &&
        'price' in obj &&
        'profit' in obj &&
        'amount_paid' in obj &&
        'item_status' in obj &&
        'title' in obj &&
        'category' in obj &&
        'description' in obj &&
        'ebaylist' in obj &&
        '_createdBy' in obj &&
        '_createdAt' in obj
}

export interface IPartListItem{
    _id: string,
    searchID: string,
    name: string,
}

export interface PartsState {
    PartInfo: IParts;
    Parts: IParts[];
    PartList: IPartListItem[]
    NeedReturnParts: IParts[];
    error: string;
}

export enum PartsActionTypes {
    FETCH_PARTS = 'FETCH_PARTS',
    FETCH_PART_INFO = "FETCH_PART_INFO",
    FETCH_PART_LIST_ITEMS = 'FETCH_PART_LIST_ITEMS',
    FETCH_NEEDRETURNPARTS = 'FETCH_NEEDRETURNPARTS',
    FETCH_PARTS_ERROR = 'FETCH_PARTS_ERROR',
}

interface FetchPartsAction {
    type: PartsActionTypes.FETCH_PARTS;
    payload: IParts[]
}

interface FetchPartInfoAction {
    type: PartsActionTypes.FETCH_PART_INFO;
    payload: IParts
}

interface FetchPartListItemsAction {
    type: PartsActionTypes.FETCH_PART_LIST_ITEMS
    payload: IPartListItem[]
}

interface FetchNeedReturnPartsAction {
    type: PartsActionTypes.FETCH_NEEDRETURNPARTS;
    payload: IParts & {field: string}
}

interface FetchPartsErrorAction {
    type: PartsActionTypes.FETCH_PARTS_ERROR;
    payload: string
}

export type PartsAction = FetchPartsAction | FetchPartListItemsAction | FetchPartInfoAction | FetchPartsErrorAction | FetchNeedReturnPartsAction