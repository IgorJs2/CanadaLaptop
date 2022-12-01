import React, {FC} from 'react';
import {Avatar} from "@mui/material";

interface IUserMessageProps {
    message: any
}

const UserMessage: FC<IUserMessageProps> = ({message}) => {
    return (
        <div className="w-full h-fit pb-2">
            {
                message.owner === "you" ?
                    (
                        <div className="w-full flex flex-col justify-center items-end text-center pr-4">
                            <div className="w-full flex flex-row justify-center items-end text-center">
                                <div className="w-full flex flex-col justify-center items-end text-center ml-4">
                                    <h1 className="text-1-5xl text-white">{message.user.name}</h1>
                                    <h1 className="text-1xl text-white opacity-50">{message.user.last_data}</h1>
                                </div>
                                <div
                                    className="h-16 box-size-content flex justify-center items-center text-center mx-4">
                                    <Avatar src={message.user.avatar} className="h-10"/>
                                </div>
                            </div>
                            <div className="text-white w-8/12 ml-64 bg-main-dark-2 rounded-2xl p-4">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="w-full flex flex-col justify-center items-start text-center pl-4">
                            <div className="w-full flex flex-row justify-center items-start text-center pl-4">
                                <div
                                    className="h-16 box-size-content flex justify-center items-center text-center mx-4">
                                    <Avatar src={message.user.avatar} className="h-10"/>
                                </div>
                                <div className="w-full flex flex-col justify-center items-start text-center ml-4">
                                    <h1 className="text-1-5xl text-white">{message.user.name}</h1>
                                    <h1 className="text-1xl text-white opacity-50">{message.user.last_data}</h1>
                                </div>
                            </div>
                            <div className="text-white w-8/12 bg-main-dark-2 rounded-2xl p-4 opacity-70">
                                <p>{message.message}</p>
                            </div>
                        </div>
                    )
            }
        </div>
    )

};

export default UserMessage;
    