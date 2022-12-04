import {PartModelAction, PartModelActionTypes, PartModelState} from "../../types/partsmodel";


const initialState: PartModelState = {
    PartModels: [],
    PartModelsList: [],
    PartModelInfo: {
        _id: "",
        searchID: "",
        name: "",
        price: 0,
        profit: 0,
        amount_paid: 0,
        _laptop_model_id: {searchID: ""},
        part_number: "",
        mpn: "",
    },
    error: ''
}

export const PartModelsReducer = (state = initialState, action: PartModelAction): PartModelState => {
    switch (action.type) {
        case PartModelActionTypes.FETCH_PARTMODEL_ERROR:
            return {...state, error: action.payload}
        case PartModelActionTypes.FETCH_PARTMODEL_INFO:
            return {...state, PartModelInfo: action.payload}
        case PartModelActionTypes.FETCH_PARTMODEL_LIST_ITEMS:
            return {...state, PartModelsList: action.payload}
        case PartModelActionTypes.FETCH_PARTMODELS:
            return {...state, PartModels: action.payload}
        default:
            return state
    }
}