import React from 'react';
import {useRouter} from "next/router";
import MainLayouts from "../../../../../layouts/MainLayout";
import {wrapper} from "../../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../../store/action-creators/user";
import {fetchMail, fetchMailInfo} from "../../../../../store/action-creators/mail";
import {fetchFilterType} from "../../../../../store/action-creators/global";
import {useTypeSelector} from "../../../../../hooks/useTypeSelector";
import {Button} from "@mui/material";


const MailBoxId = () => {
    const router = useRouter()
    const {MailInfo} = useTypeSelector(state => state.mail)

    return (
        <MainLayouts active={1}>
            <div className="w-full h-full my-10 mx-auto flex flex-row ml-32 mt-48">
                <div className="w-11/12 h-fit bg-main-dark h-96 rounded-box ml-5">
                    <div className="w-full flex flex-row justify-center items-center">
                        <div className="w-4/12 flex-row justify-start p-4">
                            {/*<div className="w-full h-full text-white flex flex-col justify-start items-start text-2xl">*/}
                            {/*    From: {MailInfo.from.full_name}*/}
                            {/*    <div className="w-full h-full text-white text-2xs">To: {MailInfo.to.full_name}</div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="w-8/12 flex-row justify-center items-center  p-4">
                            <div className="flex text-white justify-end items-end w-full text-2xl text-end pr-2">
                                {MailInfo.short_name}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-center items-center">
                        <div className="w-full h-fit text-2xl text-white flex justify-start text-start items-start p-4 break_line">
                            {MailInfo.message}
                        </div>
                    </div>


                    <div  className="text-white flex w-full justify-end p-4">
                        {/*@ts-ignore*/}
                        {/*<Button color="info" variant="outlined" className="text-white" onClick={() => router.push(*/}
                        {/*    { pathname: "send", query: { _id: MailInfo._id, reply_mail: MailInfo.short_name, to: MailInfo.from.full_name} })}*/}
                        {/*>Reply</Button>*/}
                    </div>
                </div>

            </div>
        </MainLayouts>
    );
};

export default MailBoxId;

export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res, query}) => {
    try {
        // @ts-ignore
        const token = getCookie("token", {req, res}) ? JSON.parse(getCookie("token", {req, res})?.toString()) : null

        if(!token){
            return{
                redirect: {
                    permanent: false,
                    destination: "/"
                }
            }
        }

        await store.dispatch(fetchCurrentUser(token))
        //@ts-ignore
        await store.dispatch(fetchMailInfo(token, query.id))
        await store.dispatch(fetchFilterType("MailFilter"))

        return {props: {}}
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});