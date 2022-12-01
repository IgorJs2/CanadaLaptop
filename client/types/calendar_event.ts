import {Status, WeekDay} from "./subtypes/board_task_subtype";

export interface ICalendarEvent {
    _id: string,
    created_by: string,
    title: string,
    description: string,
    isFinished: boolean,
    to: string,
    date: string,
    start_time: string,
    expire_time: string
}


export interface CalendarEventState {
    CalendarEventInfo: ICalendarEvent;
    CalendarEvents: ICalendarEvent[];
    DayEvents: ICalendarEvent[];
    error: string;
}

export enum CalendarEventActionTypes {
    FETCH_CALENDAREVENT = 'FETCH_CALENDAREVENT',
    FETCH_CALENDAREVENTS = 'FETCH_CALENDAREVENTS',
    FETCH_DAYEVENTS = 'FETCH_DAYEVENTS',
    FETCH_CALENDAREVENT_ERROR = 'FETCH_CALENDAREVENT_ERROR',
}

interface FetchCalendarEventAction {
    type: CalendarEventActionTypes.FETCH_CALENDAREVENT;
    payload: ICalendarEvent
}

interface FetchDayEventsAction {
    type: CalendarEventActionTypes.FETCH_DAYEVENTS;
    payload: ICalendarEvent[]
}

interface FetchCalendarsEventAction {
    type: CalendarEventActionTypes.FETCH_CALENDAREVENTS;
    payload: ICalendarEvent[]
}

interface FetchCalendarEventErrorAction {
    type: CalendarEventActionTypes.FETCH_CALENDAREVENT_ERROR;
    payload: string
}

export type CalendarEventAction =
    FetchCalendarsEventAction
    | FetchCalendarEventAction
    | FetchCalendarEventErrorAction
    | FetchDayEventsAction