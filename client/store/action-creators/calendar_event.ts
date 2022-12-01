import {Dispatch} from "react";
import {CalendarEventAction, CalendarEventActionTypes, ICalendarEvent} from "../../types/calendar_event";

export const fetchNewCalendarEvent = (payload: ICalendarEvent[]) => {
    return async (dispatch: Dispatch<CalendarEventAction>) => {
        try {
            dispatch({
                type: CalendarEventActionTypes.FETCH_CALENDAREVENTS,
                payload
            })
        } catch (e) {
            dispatch({
                type: CalendarEventActionTypes.FETCH_CALENDAREVENT_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchDeleteCalendarEvent = () => {
    return async (dispatch: Dispatch<CalendarEventAction>) => {
        try {

        } catch (e) {
            dispatch({
                type: CalendarEventActionTypes.FETCH_CALENDAREVENT_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchCalendarEvent = (event: ICalendarEvent) => {
    return async (dispatch: Dispatch<CalendarEventAction>) => {
        try {
            dispatch({
                type: CalendarEventActionTypes.FETCH_CALENDAREVENT,
                payload: event
            })
        } catch (e) {
            dispatch({
                type: CalendarEventActionTypes.FETCH_CALENDAREVENT_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchDayEvents = (events: ICalendarEvent[]) => {
    return async (dispatch: Dispatch<CalendarEventAction>) => {
        try {
            dispatch({
                type: CalendarEventActionTypes.FETCH_DAYEVENTS,
                payload: events
            })
        } catch (e) {
            dispatch({
                type: CalendarEventActionTypes.FETCH_CALENDAREVENT_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}