import React, {FC, useState} from 'react';
import {useRouter} from "next/router";
import {openModalHandler} from "../../handlers/openModalHandler";
import {IMail} from "../../types/mail";
import Mail from "../MailWindow/UI/Mail";
import MailModal from "../MailWindow/UI/MailModal";
import {INotification} from "../../types/notification";
import Notification from "./UI/Notification";
import notification from "./UI/Notification";
import {Badge, IconButton} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';



const NotificationWindow = () => {


    let item: INotification[] = [
        {
            text: "Error when start fetching user 11111111111111111111111111111111", _id: "13231", checked: false, type: "Error", user: "current"
        },
        {
            text: "Error when start fetching 1", _id: "31312", checked: false, type: "Warning", user: "current"
        },
        {
            text: "Error when start fetching 2", _id: "adasd", checked: true, type: "Submit", user: "current"
        },
        {
            text: "Error when start fetching 3", _id: "15616", checked: true, type: "Warning", user: "current"
        },
    ]

    item.sort((e) => !e.checked ? 1 : 0)

    const checked = [...item].reduce((total, x) => (x.checked==false ? total+1 : total), 0)

    return (
        <>
            <IconButton aria-label="cart" id="notification-icon" onClick={openModalHandler} className="mx-2">
                <Badge badgeContent={checked} max={999} color="primary" className="roundex-2xl text-2xl pointer-events-none">
                    <NotificationsIcon color="action" className="pointer-events-none" />
                </Badge>
            </IconButton>

            {/*!Important not put here any code*/}

            <div id="notification_window" className="modal-window hidden w-96 h-48 absolute top-14 right-5 bg-main-dark-2 rounded-box justify-start items-center text-center flex flex-col z-50 overflow-y-scroll overflow-x-hidden" >
                {item.map((e) => {
                    return (
                        <div key={e._id} className="w-full h-full py-2">
                            <Notification notification={e}/>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default NotificationWindow;
