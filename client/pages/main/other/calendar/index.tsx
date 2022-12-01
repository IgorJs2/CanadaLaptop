import {Button, Pagination, Stack} from '@mui/material';
import React from 'react';
import MainLayouts from "../../../../layouts/MainLayout";
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../store/action-creators/user";
import CalendarComponent from "../../../../components/CalendarComponent";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_LIST, DISPLAY_MODE_MONTH} from "../../../../components/CalendarComponent/const";

const Index = () => {
    return (
        <>

            <MainLayouts active={1}>
                <div className="w-full h-full my-10 mx-auto flex flex-col ml-36 mt-48">
                    <div className="w-11/12 bg-main-dark h-fit rounded-box mr-5 p-4 rounded-2xl" id="month_block">
                        <CalendarComponent type={DISPLAY_MODE_MONTH}/>
                    </div>

                    <div className="w-11/12 mt-10 bg-main-dark h-fit rounded-box mr-5 p-4 rounded-2xl" id="day_block">
                        <CalendarComponent type={DISPLAY_MODE_DAY}/>
                    </div>

                    <div className="w-11/12 mt-10 bg-main-dark h-fit rounded-box mr-5 p-4 rounded-2xl" id="list_block">
                        <CalendarComponent type={DISPLAY_MODE_LIST}/>
                    </div>
                </div>
            </MainLayouts>
        </>
    );
};

export default Index;

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