import React from "react";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from "../../const";
import {classLister} from "../../../../helpers/classList";
import styles from "../../style.module.css";
import {Button, Pagination, Stack} from "@mui/material";


const Monitor = (props: any) => {

    const classes = classLister(styles);

   const {today, prevHandler, todayHandler, nextHandler, setDisplayMode, displayMode} = props

    if(!setDisplayMode && !displayMode){
        return(
            <div className={classes("div_wrapper")}>
                <div className={classes("buttons_wrapper")}>
                    <div className="flex flex-row ">
                        <Button variant="outlined" color="info" className="h-10" onClick={prevHandler}>&lt;</Button>
                        <Button variant="contained" color="primary" className="mx-4 bg-main-dark-2 h-10" onClick={todayHandler}>Today</Button>
                        <Button variant="outlined" color="info" className="h-10" onClick={nextHandler}>&gt;</Button>
                    </div>
                </div>

                <div>
                    <span className={classes("title_wrapper")}>{today.format('MMMM')}</span>
                    <span className={classes("text_wrapper")}>{today.format('YYYY')}</span>
                </div>

            </div>
        )
    }


    return (
        <div className={classes("div_wrapper")}>
            <div className={classes("buttons_wrapper")}>
                <div className="flex flex-row ">
                    <Button variant="outlined" color="info" className="h-10" onClick={prevHandler}>&lt;</Button>
                    <Button variant="contained" color="primary" className="mx-4 bg-main-dark-2 h-10" onClick={todayHandler}>Today</Button>
                    <Button variant="outlined" color="info" className="h-10" onClick={nextHandler}>&gt;</Button>
                </div>
            </div>

            <div>
                {
                    displayMode === DISPLAY_MODE_DAY ? (
                        <span className={classes("text_wrapper")}>{today.format('DD')}</span>
                    ) : null
                }
                <span className={classes("title_wrapper")}>{today.format('MMMM')}</span>
                <span className={classes("text_wrapper")}>{today.format('YYYY')}</span>
            </div>

            <div className={classes("buttons_wrapper")}>
                <Button variant="outlined" color="info" className="mx-2"><a href="#day_block">Day</a></Button>
                <Button variant="outlined" color="info" className="mx-2"><a href="#month_block">Month</a></Button>
                <Button variant="outlined" color="info" className="mx-2"><a href="#list_block">List</a></Button>
            </div>
        </div>
    )
};

export {Monitor};
