import moment from "moment";

export const totalDays = 42;

export const DISPLAY_MODE_MONTH = 'month';
export const DISPLAY_MODE_DAY = 'day';
export const DISPLAY_MODE_LIST = 'list';

export const DATAPICKER = "datapicker"

export const CALENDAR_WEEKS = 6;
export const ITEMS_PER_DAY = 24;

export const isCurrentDay = (day: any) => moment().isSame(day, 'day');

export const isSelectedMonth = (day: any ,today: any ) => today.isSame(day, 'month');

export const isDayContainCurrentEvent = (event: any, dayItem: any) => {
    return event.date === dayItem.format("MM/DD/YYYY")
}


export const timeArray = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
]



