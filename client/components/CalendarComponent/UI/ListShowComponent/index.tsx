import React, {useState} from "react";
import {DISPLAY_MODE_LIST, isDayContainCurrentEvent, ITEMS_PER_DAY, totalDays} from "../../const";
import moment from "moment";
import {classLister} from "../../../../helpers/classList";
import styles from "../../style.module.css";
import {CalendarCell} from "../CalendarCell";
import {Divider, Typography} from "@mui/material";

export const ListShowComponent = (props: any) => {

  const {
    events, today, openFormHandler, startDay
  } = props

  const classes = classLister(styles);

  const day = startDay.clone().subtract(1, 'day');
  const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())

  const eventList = events.filter((event: any) => isDayContainCurrentEvent(event, today));
  const cells = [... new Array(ITEMS_PER_DAY)].map((_, i) => {
    const temp: any = [];
    eventList.forEach((event: any) => {
      // event.date -> '1661295600' -> moment -> timestamp -> H  ? -> 0
      if (+moment.unix(+event.date).format('H') === i) {
        temp.push(event);
      }
    })
    return temp;
  });


  return (
    <div className={classes("day_show_wrapper")}>
      <Typography gutterBottom variant="h5" component="div">
        Month event list
      </Typography>
      <Divider />
      <ul className={classes("event_list_wrapper")}>
        <div className={classes("scale_wrapper")}>
          {
            daysMap.map((dayItem) => (
                <CalendarCell today={today} events={events.filter((event: any) => isDayContainCurrentEvent(event, dayItem))}
                              openFormHandler={openFormHandler} dayItem={dayItem} displayMode={DISPLAY_MODE_LIST}/>
            ))
          }
        </div>
      </ul>
    </div>
  )
}