import React, {useEffect, useState} from 'react';
import moment from "moment";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_LIST, DISPLAY_MODE_MONTH, totalDays} from './const';
import {classLister} from "../../helpers/classList";
import styles from "./style.module.css";
import {Monitor} from "./UI/Monitor";
import {CalendarGrid} from "./UI/CalendarGrid";
import {DayShowComponent} from "./UI/DayShowComponent";
import {Modal} from "@mui/material";
import AddEventModal from "./UI/AddEventModal";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useAction} from "../../hooks/useAction";
import {ICalendarEvent} from "../../types/calendar_event";
import {useInput} from "../../hooks/useInput";
import {ListShowComponent} from "./UI/ListShowComponent";


const data: ICalendarEvent[] = [
    {
        _id: "1",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/10/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "2",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/11/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "3",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/09/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: true,
    },
    {
        _id: "1",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/10/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "2",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/11/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "3",
        title: "123123213123123Go to bath",
        description: "123123213123123Go123123213123123Go123123213123123Go123123213123123GoGo to bath",
        date: "10/09/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: true,
    },
    {
        _id: "1",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/10/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "2",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/11/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "3",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/09/2022",
        start_time: "15:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: true,
    },
    {
        _id: "1",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/10/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "2",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/11/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: false,
    },
    {
        _id: "3",
        title: "Go to bath",
        description: "Go to bath",
        date: "10/09/2022",
        start_time: "14:00",
        expire_time: "18:00",
        created_by: "Ihor",
        to: "you",
        isFinished: true,
    },
]



const Index = (props: any) => {

    const {type} = props

    const classes = classLister(styles);
    moment.updateLocale('en', {week: {dow: 1}});


    const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
    const [today, setToday] = useState(moment())

    const startDay = moment(today).clone().startOf('month').startOf('week')

    const [method, setMethod] = useState<string>("")
    const [isShowForm, setShowForm] = useState<boolean>(false);

    const {CalendarEvents, CalendarEventInfo, DayEvents} = useTypeSelector(state => state.calendar_event)
    const {fetchNewCalendarEvent, fetchDeleteCalendarEvent} = useAction()

    useState(() => {
        fetchNewCalendarEvent(data)
    })


    const prevHandler = () => setToday(prev => prev.clone().subtract(1, displayMode));
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday(prev => prev.clone().add(1, displayMode));

    const openFormHandler = (methodName, eventForUpdate, dayItem) => {
        // setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')});
        setMethod(methodName);
    }

    const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
        setShowForm(true);
        openFormHandler(methodName, eventForUpdate, dayItem);
    }

    const cancelButtonHandler = () => {
        setShowForm(false);
        // setEvent(null);
    }

    const changeEventHandler = (text, field) => {
        // setEvent(prevState => ({
        //     ...prevState,
        //     [field]: text
        // }))
    }


    return (
        <>
            <AddEventModal visible={isShowForm} cancelButtonHandler={cancelButtonHandler} changeEventHandler={changeEventHandler}
                           eventFetchHandler={fetchNewCalendarEvent} removeEventHandler={fetchDeleteCalendarEvent} method={method} event={CalendarEvents}  setVisible={setShowForm}/>
            <div className={classes("shadow_wrapper")}>
                {
                    type === DISPLAY_MODE_MONTH ? (
                        <>
                            <Monitor
                                today={today}
                                prevHandler={prevHandler}
                                todayHandler={todayHandler}
                                nextHandler={nextHandler}
                                setDisplayMode={setDisplayMode}
                                displayMode={displayMode}
                            />
                            <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={CalendarEvents} openFormHandler={openModalFormHandler} setDisplayMode={setDisplayMode} />
                        </>
                    ) : null
                }
                {
                    type === DISPLAY_MODE_DAY ? (
                        <DayShowComponent events={DayEvents} today={today} openFormHandler={openFormHandler} />
                    ) : null
                }
                {
                    type === DISPLAY_MODE_LIST ? (
                        <ListShowComponent events={CalendarEvents} today={today} openFormHandler={openFormHandler} startDay={startDay}/>
                    ) : null
                }
            </div>
        </>
    );
}

export default Index;
