import {GlobalAction, GlobalActionTypes, GlobalState} from "../../types/globalState";


const initialState: GlobalState = {
    GlobalStateInfo: {
        filter: false,
        filterType: "",
        filterValue: {},
        sort_field: "",
        sort_value: 'asc',
        maxpage: 1,
        page: 0,
        count: 10
    },
    error: ''
}


export const GlobalReducer = (state = initialState, action: GlobalAction): GlobalState => {
    switch (action.type) {
        case GlobalActionTypes.FETCH_GLOBAL_ERROR:
            return {...state, error: action.payload}
        case GlobalActionTypes.FETCH_GLOBAL_SEARCH_OPTIONS:
            return {error: "", GlobalStateInfo: {...state.GlobalStateInfo,  ...action.payload}}
        case GlobalActionTypes.FETCH_GLOBAL_PAGE:
            return {...state, GlobalStateInfo: {...state.GlobalStateInfo,  ...action.payload}}
        case GlobalActionTypes.FETCH_GLOBAL_COUNT:
            return {...state, GlobalStateInfo: {...state.GlobalStateInfo,  ...action.payload}}
        case GlobalActionTypes.FETCH_GLOBAL_SORT_FIELD:
            return {...state, GlobalStateInfo: {...state.GlobalStateInfo, ["sort_field"]: action.payload}}
        case GlobalActionTypes.FETCH_GLOBAL_SORT_VALUE:
            return {...state, GlobalStateInfo: {...state.GlobalStateInfo, ["sort_value"]: action.payload}}
        case GlobalActionTypes.FETCH_GLOBAL_MAXPAGE:
            return {...state, GlobalStateInfo: {...state.GlobalStateInfo,  ...action.payload}}
        case GlobalActionTypes.FETCH_GLOBAL_FILTER:
            return {error: '', GlobalStateInfo: {...state.GlobalStateInfo, ...action.payload}}
        case GlobalActionTypes.FETCH_FILTER_TYPE:
            return {error: '', GlobalStateInfo: {...state.GlobalStateInfo, filterType: action.payload}}
        default:
            return state
    }
}