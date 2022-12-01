import React from "react";

import {CalendarCell} from "../CalendarCell";
import {DATAPICKER, DISPLAY_MODE_LIST, DISPLAY_MODE_MONTH, isDayContainCurrentEvent} from "../../const";



export const MonthDaysList = (props: any) => {

  const {startDay, totalDays, events, openFormHandler, today, setDisplayMode, displayMode, setDate} = props

  const day = startDay.clone().subtract(1, 'day');
  const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())

  console.log(displayMode)

  if(displayMode === DATAPICKER){
    return (
        <>
          {
            daysMap.map((dayItem) => (
                <CalendarCell displayMode={displayMode} today={today} dayItem={dayItem} setDate={setDate}/>
            ))
          }
        </>
    )
  }

  return (
      <>
        {
          daysMap.map((dayItem) => (
              <CalendarCell today={today} displayMode={displayMode} events={events.filter((event: any) => isDayContainCurrentEvent(event, dayItem))}
                            openFormHandler={openFormHandler} dayItem={dayItem} setDisplayMode={setDisplayMode}/>
          ))
        }
      </>
  )
}