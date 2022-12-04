import React, {FC, useState} from 'react';
import {IMail} from "../../../types/mail";
import MailModal from "./MailModal";

type TMailProps = {
    mail: IMail,
    onClick: (e: React.MouseEvent<HTMLElement>) => void,
}

const Mail: FC<TMailProps> = ({mail, onClick}) => {

    return (
        <div className="w-11/12 mx-auto h-20 bg-main-dark transition-all text-white rounded-box hover:scale-105 flex justify-start" data-id={mail._id} onClick={onClick}>
            <div className="w-2/12 pointer-events-none h-full flex-row justify-center items-center text-center">
                <i className='bx bx-envelope text-2xl mx-2 my-auto h-full w-full text-center items-center justify-center flex'></i>
            </div>
            <div className="w-8/12 flex justify-center text-center items-center pointer-events-none">
                <i className='bx bxs-user-circle bg-main-dark text-3xl'></i>
                <div className="mx-2">{mail.from.full_name}</div>
            </div>
            <div className="w-2/12 pointer-events-none h-full flex-row justify-center items-center text-center">
                {
                    mail.checked ?
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

export default Mail;