import React from "react";
import moment from "moment";
import {CalendarGridHeader} from "../CalendarGridHeader";
import {MonthDaysList} from "../MonthDaysList";
import {classLister} from "../../../../helpers/classList";
import styles from "../../style.module.css";
import {Button} from "@mui/material";
import {DATAPICKER} from "../../const";

const CalendarGrid = (props: any) => {
	const classes = classLister(styles);

	const {startDay, today, totalDays, events, openFormHandler, setDisplayMode, setDate, displayMode} = props

	return (
		<>
			<div className={classes("grid_wrapper")}>
				<CalendarGridHeader />
			</div>
			<div className={classes("grid_wrapper")}>
				<MonthDaysList totalDays={totalDays} openFormHandler={openFormHandler} events={events} displayMode={displayMode} startDay={startDay} today={today} setDisplayMode={setDisplayMode} setDate={setDate}/>
			</div>
		</>
	);
};

export { CalendarGrid };
