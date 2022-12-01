import {LaptopAction, LaptopActionTypes, LaptopState} from "../../types/laptop";


const initialState: LaptopState = {
    Laptops: [],
    LaptopList: [],
    LaptopInfo: {
        _id: "",
        searchID: "",
        img: [],
        model: "",
        daysfrompaym: 0,
        price: 0,
        profit: 0,
        amount_paid: 0,
        item_status: 0,
        title: "",
        category: [],
        description: "",
        tracknumber: "",
        ebaylist: "",
        moneybackdays: 0,
        _createdBy: { full_name: "" },
        _createdAt: "",
    },
    error: ''
}

export const LaptopReducer = (state = initialState, action: LaptopAction): LaptopState => {
    switch (action.type) {
        case LaptopActionTypes.FETCH_LAPTOP_ERROR:
            return {...state, error: action.payload}
        case LaptopActionTypes.FETCH_LAPTOPS:
            return {...state, Laptops: action.payload}
        case LaptopActionTypes.FETCH_LAPTOP_LIST_ITEMS:
            return {...state, LaptopList: action.payload}
        case LaptopActionTypes.FETCH_LAPTOP_INFO:
            return {...state, LaptopInfo: action.payload}
        default:
            return state
    }
}