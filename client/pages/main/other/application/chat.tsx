import React from 'react';
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../store/action-creators/user";
import {fetchMail} from "../../../../store/action-creators/mail";
import {fetchFilterType} from "../../../../store/action-creators/global";
import MainLayouts from "../../../../layouts/MainLayout";
import ChatList from "../../../../components/ChatList";
import {Divider, InputAdornment, TextField} from "@mui/material";
import {AccountCircle, Search} from "@mui/icons-material";
import ChatInfo from "../../../../components/ChatInfo";


const Chat = () => {

    return (
        <>
            <MainLayouts active={1}>
                <div className="w-full h-full my-10 mx-auto flex flex-row ml-32 mt-48">
                    <div className="w-3/12 bg-main-dark h-fit pb-4 rounded-box mr-5 rounded-2xl">
                        <div className="w-11/12 mx-auto mt-4 text-center text-white">
                            <ChatList />
                        </div>
                    </div>
                    <div className="w-8/12 h-fit bg-main-dark rounded-box ml-5 rounded-2xl">
                        <ChatInfo />
                    </div>
                </div>
            </MainLayouts>
        </>
    );
};

export default Chat;

export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res}) => {
    try {
        // @ts-ignore
        const token = getCookie("token", {req, res}) ? JSON.parse(getCookie("token", {req, res})?.toString()) : null

        if (!token) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/"
                }
            }
        }

        await store.dispatch(fetchCurrentUser(token))

        return {props: {}}
    } catch (e) {
        return {props: {}}
        console.log(e)
    }

});

