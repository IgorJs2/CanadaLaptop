import React, {FC} from 'react';
import {openShortSidebarHandler} from "../../handlers/OpenSidebarHandler";
import SidebarWorker from "./SidebarWorker";
import SidebarAdmin from "./SidebarAdmin";
import SidebarSeller from "./SidebarSeller";
import {classLister} from "../../../../helpers/classList";
import styles from "../../SideBar.module.css";
import {IUser} from "../../../../types/user";

interface ISidebarMenuProps {
    user: IUser
}

const SidebarMenu: FC<ISidebarMenuProps> = ({user}) => {
    const classes = classLister(styles);

    return (
        <div className={classes("sidebar", "close")} id="adminsidebar">
            <div className={classes("logo-details")}>
                <i className="bx bx-list-ul hover:bg-main-dark-2 transition-all"
                   onClick={openShortSidebarHandler}></i>
            </div>
            {user.type === "Worker" ? (
                <SidebarWorker/>
            ) : (<></>)}
            {user.type === "Admin" ? (
                <SidebarAdmin/>
            ) : (<></>)}
            {user.type === "Seller" ? (
                <SidebarSeller/>
            ) : (<></>)}
        </div>
    );
};

export default SidebarMenu;