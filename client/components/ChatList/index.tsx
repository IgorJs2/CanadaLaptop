import React from 'react';
import {Divider, InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import ChatItem from "./UI/ChatItem";

const Index = () => {

    const chat = [
        {user: {avatar: "https://picsum.photos/200/300?grayscale", name: "Avatar 1", active: true}, date: 27.04, last_message: "blalablalbab..."},
        {user: {avatar: "https://picsum.photos/200/300?grayscale", name: "Avatar 2", active: false}, date: 23.04, last_message: "blalablalbab1..."},
        {user: {avatar: "https://picsum.photos/200/300?grayscale", name: "Avatar 3", active: false}, date: 26.04, last_message: "blalablalbab2..."},
        {user: {avatar: "https://picsum.photos/200/300?grayscale", name: "Avatar 4", active: true}, date: 27.44, last_message: "blalablalbab3..."},

    ]

    return (
        <>
            <h1 className="w-full text-left">Chats</h1>
            <TextField  InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    </InputAdornment>
                ),
            }} id="outlined-basic" label="Search content here..." variant="outlined" color="info" className="my-4 float-left w-full"/>

            {
                chat.map((e) => {
                    return (<ChatItem chat={e}/>)
                })
            }

        </>
    );
};

export default Index;