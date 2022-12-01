import {TimeAction, TimeActionTypes, TimeState} from "../../types/time";


const initialState: TimeState = {
    TimeInfo: {
        _id: "",
        user: "",
        date_start: "",
        date_finish: "",
        total: 0
    },
    error: ''
}

export const TimeReducer = (state = initialState, action: TimeAction): TimeState => {
    switch (action.type) {
        case TimeActionTypes.FETCH_TIME_ERROR:
            return {...state, error: action.payload}
        case TimeActionTypes.FETCH_TIME:
            return {...state, TimeInfo: action.payload}
        default:
            return state
    }
}