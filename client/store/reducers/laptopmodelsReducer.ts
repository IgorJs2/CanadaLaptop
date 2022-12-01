import {
    ILaptopPriorityModel,
    LaptopModelAction,
    LaptopModelActionTypes,
    LaptopModelState
} from "../../types/laptopmodel";


const initialState: LaptopModelState = {
    LaptopModels: [],
    Priority: [],
    LaptopModelList: [],
    LaptopModelInfo: {
        _id: "",
        searchID: "",
        name: "",
        price: 0,
        profit: 0,
        amount_paid: 0,
        defects: [],
        description: "",
        moneybackdays: 0,
    },
    error: ''
}

export const LaptopModelsReducer = (state = initialState, action: LaptopModelAction): LaptopModelState => {
    switch (action.type) {
        case LaptopModelActionTypes.FETCH_LAPTOPMODEL_ERROR:
            return {...state, error: action.payload}
        case LaptopModelActionTypes.FETCH_LAPTOPMODEL:
            return {...state, error: "", LaptopModelInfo: action.payload}
        case LaptopModelActionTypes.FETCH_LAPTOPMODEL_LIST_ITEMS:
            return {...state, error: "", LaptopModelList: action.payload}
        case LaptopModelActionTypes.FETCH_LAPTOPMODELS:
            return {...state, error: "", LaptopModels: action.payload}
        case LaptopModelActionTypes.FETCH_PRIORITY:
            return {...state, error: "", Priority: action.payload }
        default:
            return state
    }
}