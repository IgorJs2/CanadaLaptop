import {CalendarEventAction, CalendarEventActionTypes, CalendarEventState} from "../../types/calendar_event";


const initialState: CalendarEventState = {
    CalendarEventInfo: {
        _id: "",
        created_by: "",
        title: "",
        description: "",
        isFinished: false,
        to: "",
        start_time: "",
        date: "",
        expire_time: ""
    },
    CalendarEvents: [],
    DayEvents: [],
    error: ''
}

export const CalendarEventReducer = (state = initialState, action: CalendarEventAction): CalendarEventState => {
    switch (action.type) {
        case CalendarEventActionTypes.FETCH_CALENDAREVENT_ERROR:
            return {...state, error: action.payload}
        case CalendarEventActionTypes.FETCH_CALENDAREVENT:
            return {error: "", CalendarEvents: state.CalendarEvents, CalendarEventInfo: {...state.CalendarEventInfo, ...action.payload}, DayEvents: state.DayEvents}
        case CalendarEventActionTypes.FETCH_DAYEVENTS:
            return {error: "", CalendarEvents: state.CalendarEvents, CalendarEventInfo: state.CalendarEventInfo, DayEvents: action.payload}
        case CalendarEventActionTypes.FETCH_CALENDAREVENTS:
            return {error: "", CalendarEventInfo: state.CalendarEventInfo, CalendarEvents: action.payload, DayEvents: state.DayEvents}
        default:
            return state
    }
}