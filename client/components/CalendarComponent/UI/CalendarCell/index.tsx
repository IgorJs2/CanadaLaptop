import React from "react";
import {DATAPICKER, DISPLAY_MODE_DAY, DISPLAY_MODE_LIST, DISPLAY_MODE_MONTH, isCurrentDay} from "../../const";
import {classLister} from "../../../../helpers/classList";
import styles from "../../style.module.css"
import {useAction} from "../../../../hooks/useAction";
import {useRouter} from "next/router";
import {fetchDayEvents} from "../../../../store/action-creators/calendar_event";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";


export const CalendarCell = (props: any) => {
    const classes = classLister(styles);
    const router = useRouter()

    const {CalendarEvents} = useTypeSelector(state => state.calendar_event)
    const {fetchCalendarEvent, fetchDayEvents} = useAction()

    const {dayItem, today, openFormHandler, events, setDisplayMode, setDate, displayMode} = props

    if(displayMode === DATAPICKER){
        return(
            <div className={classes("cell_wrapper-datapicker")} onClick={() => setDate(dayItem.format("YYYY/DD/MM"))}>
                <div className={classes("row_in_cell_end")} >
                    <div className={classes("show_day_wrapper")}>
                        <div>
                            {
                                isCurrentDay(dayItem) ? (
                                    <div className={classes("current_day_datapicker")}>{dayItem.format('D')}</div>
                                ) : (
                                    dayItem.format('D')
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if(displayMode === DISPLAY_MODE_LIST){

        return(
            <div className={classes("cell_wrapper-list")} onDoubleClick={() => openFormHandler('Create', null, dayItem)} onClick={() => {
                const dayEvents = CalendarEvents.map((e) => {
                    if(e.date === dayItem.format("MM/DD/YYYY")){
                        return e
                    }
                }).filter((e) => e ? 1 : 0) || []
                // @ts-ignore
                fetchDayEvents(dayEvents)
                router.push("#day_block")
            }}>
                <div className={classes("row_in_cell_end")} >
                    <div className={classes("show_day_wrapper")}>
                        <div>
                            {
                                isCurrentDay(dayItem) ? (
                                    <div className={classes("current_day_list")}>{dayItem.format('LLLL')}</div>
                                ) : (
                                    dayItem.format('LLLL')
                                )
                            }
                        </div>
                    </div>
                    <ul className={classes("event_list_wrapper")}>
                        {
                            events
                                .map((event: any) => (
                                    <li className={classes("event_list_item_wrapper")} key={event.id}
                                        onClick={() => {

                                        }
                                    }>
                                        <button className={classes("event_item_wrapper")}
                                                onDoubleClick={() => openFormHandler('Update', event)}>
                                            {event.title}
                                        </button>
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </div>
        )
    }

    if(DISPLAY_MODE_MONTH){
        return (
            <div className={classes("cell_wrapper-94")} onDoubleClick={() => openFormHandler('Create', null, dayItem)} onClick={() => {
                const dayEvents = CalendarEvents.map((e) => {
                    if(e.date === dayItem.format("MM/DD/YYYY")){
                        return e
                    }
                }).filter((e) => e ? 1 : 0) || []
                // @ts-ignore
                fetchDayEvents(dayEvents)
                router.push("#list_block")
            }}>
                <div className={classes("row_in_cell_end")} >
                    <div className={classes("show_day_wrapper")}>
                        <div>
                            {
                                isCurrentDay(dayItem) ? (
                                    <div className={classes("current_day")}>{dayItem.format('D')}</div>
                                ) : (
                                    dayItem.format('D')
                                )
                            }
                        </div>
                    </div>
                    <ul className={classes("event_list_wrapper")}>
                        {
                            events
                                .slice(0, 2)
                                .map((event: any) => (
                                    <li className={classes("event_list_item_wrapper")} key={event.id}>
                                        <button className={classes("event_item_wrapper")}
                                                onDoubleClick={() => openFormHandler('Update', event)}>
                                            {event.title}
                                        </button>
                                    </li>
                                ))
                        }
                        {
                            events.length > 2 ? (
                                <li className={classes("event_list_item_wrapper")} key={"Show more"}>
                                    <button className={classes("event_item_wrapper")}
                                            onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>
                                        Show more...
                                    </button>
                                </li>
                            ) : null
                        }
                    </ul>
                </div>
            </div>
        )
    }

}