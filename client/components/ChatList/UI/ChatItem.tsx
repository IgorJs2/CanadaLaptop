import React, {FC} from 'react';
import {Avatar} from "@mui/material";
import { StyledBadgeOffline, StyledBadgeOnline } from '../styles/StyledBadge';

interface IChatItemProps{
    chat: any
}

const ChatItem: FC<IChatItemProps> = ({chat}) => {
    return (
        <div className="w-11/12 mx-auto my-4 flex flex-row bg-main-dark-2 rounded-2xl p-2 hover:bg-opacity-80">
            <div className="w-2/12 h-16 flex justify-center items-center text-center">
                {chat.user.active ? (
                        <StyledBadgeOnline
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={chat.user.avatar} />
                        </StyledBadgeOnline>
                ) :
                    (
                        <StyledBadgeOffline
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={chat.user.avatar} />
                        </StyledBadgeOffline>
                    )}

            </div>
            <div className="w-9/12 flex flex-col justify-start items-start text-center">
                <h1 className="text-1-5xl">{chat.user.name}</h1>
                <p className="text-1xl">{chat.last_message}</p>
            </div>
            <div className="relative top-1 right-4">
                {chat.date}
            </div>
        </div>
    );
};

export default ChatItem;