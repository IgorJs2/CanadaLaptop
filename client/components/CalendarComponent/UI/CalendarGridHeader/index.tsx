import React from "react";
import moment from "moment";
import {classLister} from "../../../../helpers/classList";
import styles from "../../style.module.css";

export const CalendarGridHeader = () => {

  const classes = classLister(styles);

  return (
      <>
        {
          [...Array(7)].map((_, i) => (
              <div className={classes("grid_wrapper")} key={i}>
                <div className={classes("row_in_cell-end")}>
                  {moment().day(i+1).format('ddd')}
                </div>
              </div>
          ))
        }
      </>
  )

}