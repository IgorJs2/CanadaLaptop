import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {CalendarGrid} from "../CalendarGrid";
import {totalDays} from "../../const";
import {Monitor} from "../Monitor";

interface ICalendarProps {
    today: any,
    setToday: Dispatch<SetStateAction<any>>,
    startDay: any,
    prevHandler: () => void,
    todayHandler: () => void,
    nextHandler: () => void,
    setDate: (e: React.ChangeEvent<HTMLInputElement>) => void,
    displayMode: string
}


const Index: FC<ICalendarProps> = ({today, displayMode, setToday, startDay, prevHandler, todayHandler, nextHandler, setDate}) => {

    console.log(displayMode)

    return (
        <>
            <Monitor
                today={today}
                prevHandler={prevHandler}
                todayHandler={todayHandler}
                nextHandler={nextHandler}
            />
            <CalendarGrid displayMode={displayMode} startDay={startDay} today={today} totalDays={totalDays} setDate={setDate}/>
        </>
    );
};

export default Index;






