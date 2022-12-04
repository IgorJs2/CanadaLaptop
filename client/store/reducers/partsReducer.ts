import {PartsAction, PartsActionTypes, PartsState} from "../../types/parts";
import {TItemStatus} from "../../types/subtypes/TItemStatus";


const initialState: PartsState = {
    PartInfo: {
        _id: "",
        searchID: "",
        img: [],
        _laptopID: "",
        _laptopSearchID: "",
        price: 0,
        profit: 0,
        amount_paid: 0,
        item_status: 0,
        title: "",
        category: "",
        description: "",
        ebaylist: "",
        _createdBy: {full_name: ""},
        _createdAt: "",
    },
    PartList: [],
    Parts: [],
    NeedReturnParts: [],
    error: ''
}

export const PartReducer = (state = initialState, action: PartsAction): PartsState => {
    switch (action.type) {
        case PartsActionTypes.FETCH_PARTS_ERROR:
            return {...state, error: action.payload}
        case PartsActionTypes.FETCH_PARTS:
            return {...state, Parts: action.payload}
        case PartsActionTypes.FETCH_PART_LIST_ITEMS:
            return {...state, PartList: action.payload}
        case PartsActionTypes.FETCH_PART_INFO:
            return {...state, PartInfo: action.payload}
        default:
            return state
    }
}