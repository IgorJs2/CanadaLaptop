import React, {useState} from "react";
import {isDayContainCurrentEvent, ITEMS_PER_DAY} from "../../const";
import moment from "moment";
import {classLister} from "../../../../helpers/classList";
import styles from "../../style.module.css";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Typography} from "@mui/material";

export const DayShowComponent = (props: any) => {

  const {
    events, today, openFormHandler
  } = props

  const classes = classLister(styles);

  return (
    <div className={classes("day_show_wrapper")}>
      <Typography gutterBottom variant="h5" component="div">
        Day event list
      </Typography>
      <Divider/>
      <ul className={classes("event_list_wrapper")}>
        <div className={classes("scale_wrapper")}>
          {
            events.sort((e, sec_e) => {
              const start_time = (Number(e.start_time.split(":")[0]) * 60) + Number(e.start_time.split(":")[1])
              const sec_start_time = (Number(sec_e.start_time.split(":")[0]) * 60) + Number(sec_e.start_time.split(":")[1])
              if(start_time > sec_start_time) {
                return 1
              }
              return 0
            }).map((event, i) => (
                <Card className="w-full break-words my-3 px-2">
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {event.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Typography>
                      {event.start_time + " - " + event.expire_time}
                    </Typography>
                  </CardActions>
                </Card>
            ))
          }
        </div>
      </ul>
    </div>
  )
}