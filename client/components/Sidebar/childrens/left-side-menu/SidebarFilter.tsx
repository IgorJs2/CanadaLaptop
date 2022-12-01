import React, {FC} from 'react';
import styles from "../../SideBar.module.css"
import {classLister} from "../../../../helpers/classList";
import {openShortSidebarHandler, openSidebarHandler} from "../../handlers/OpenSidebarHandler";
import SidebarIPart from "../filters/Sidebar_IPart";
import SidebarIPartModel from "../filters/Sidebar_IPartModel";
import SidebarILaptop from "../filters/Sidebar_ILaptop";
import SidebarILaptopModel from "../filters/Sidebar_ILaptopModel";
import {Typography} from "@mui/material";

interface ISidebarFilterProps {
    filterType: string,
}

const SidebarFilter: FC<ISidebarFilterProps> = ({filterType}) => {
    const classes = classLister(styles)

    return (
        <>
            <div className={classes("sidebar", "close")} id="filter_sidebar">
                <Typography className="mt-10" variant="h5" component="h6">
                  Filter List
                </Typography>
                {filterType !== "" ?
                    (
                        <>
                            {filterType === "PartFilter"
                                ? (<SidebarIPart />)
                                : (<></>)}
                            {filterType === "PartModelFilter"
                                ? (<SidebarIPartModel />)
                                : (<></>)}
                            {filterType === "LaptopFilter"
                                ? (<SidebarILaptop />)
                                : (<></>)}
                            {filterType === "LaptopModelFilter"
                                ? (<SidebarILaptopModel />)
                                : (<></>)}
                        </>
                    )
                    :
                    (
                        <></>
                    )}
            </div>
        </>
    );
};

export default SidebarFilter;