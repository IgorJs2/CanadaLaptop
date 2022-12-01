import React, {FC, useState} from 'react';
import {INotification} from "../../../types/notification";

type TNotificationProps = {
    notification: INotification,
}

const Notification: FC<TNotificationProps> = ({notification}) => {

    return (
        <div className="w-11/12 mx-auto h-20 bg-main-dark transition-all text-white rounded-box hover:scale-105 flex justify-start" data-id={notification._id}>
            <div className="w-2/12 pointer-events-none h-full flex-row justify-center items-center text-center p-2">
                {notification.type === "Submit" ? (<div className="w-full h-full text-white text-2xl flex justify-center items-center text-center rounded-3xl bg-green">!</div>) : (<></>)}
                {notification.type === "Error" ? (<div className="w-full h-full text-white text-2xl flex justify-center items-center text-center rounded-3xl bg-red">!</div>) : (<></>)}
                {notification.type === "Warning" ? (<div className="w-full h-full text-white text-2xl flex justify-center items-center text-center rounded-3xl bg-yellow">!</div>) : (<></>)}
            </div>
            <div className="w-8/12 flex justify-center text-center items-center pointer-events-none">
                {notification.text}
            </div>
            <div className="w-2/12 pointer-events-none h-full flex-row justify-center items-center text-center">
                {
                    notification.checked ?
                        (
                            <i className='bx bx-check-double text-green text-3xl mr-4 my-auto h-full w-full text-center items-center justify-center flex'></i>
                        )
                        :
                        (
                            <i className='bx bx-check text-yellow text-3xl mr-4 my-auto h-full w-full text-center items-center justify-center flex' />
                        )
                }
            </div>
        </div>
    );
};

export default Notification;