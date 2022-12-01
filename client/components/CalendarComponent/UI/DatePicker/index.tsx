import React, {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import Calendar from "../Calendar";
import {TextField} from "@mui/material";
import moment from "moment";
import {DATAPICKER, DISPLAY_MODE_LIST, DISPLAY_MODE_MONTH} from "../../const";
import {useInput} from "../../../../hooks/useInput";

interface IDatePickerProps {
    setCurrentDate: Dispatch<SetStateAction<string>>
    currentDate: string,
    date: string,
    setDate: Dispatch<SetStateAction<string>>
}

export const Datepicker: FC<IDatePickerProps> = ({setCurrentDate, currentDate, date, setDate}) => {
    const [calendarOpen, setCalendarOpen] = useState(false);

    const toggleCalendar = () => {
        setCalendarOpen(!calendarOpen);
    }

    useEffect(() => {
        setCalendarOpen(false)
    }, [date]);

    moment.updateLocale('en', {week: {dow: 1}});

    const [today, setToday] = useState(moment())

    const startDay = moment(today).clone().startOf('month').startOf('week')

    const prevHandler = () => setToday(prev => prev.clone().subtract(1, DISPLAY_MODE_MONTH));
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday(prev => prev.clone().add(1, DISPLAY_MODE_MONTH));

    return (
        <>
            <div>
                <div>
                    <TextField
                        type="text"
                        value={date}
                        onClick={toggleCalendar}
                        placeholder="YYYY / MM / DD"
                    />
                </div>
            </div>
            {calendarOpen && (
                <div className="relative top-10 right-60">
                    <div className="w-62 h-64 absolute z-10">
                        <Calendar displayMode={DATAPICKER} nextHandler={nextHandler} prevHandler={prevHandler} setToday={setToday} startDay={startDay} today={today} todayHandler={todayHandler} setDate={setDate}/>
                    </div>
                </div>
            )}
        </>

    );
}
