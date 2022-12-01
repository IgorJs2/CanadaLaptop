import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import React, {useEffect, useState} from 'react';
import MainLayouts from "../../../../layouts/MainLayout";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import FAQBlock from "../../../../components/FAQBlock";
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../store/action-creators/user";
import {fetchMail} from "../../../../store/action-creators/mail";
import {fetchFilterType} from "../../../../store/action-creators/global";

const Faq = () => {
    const [openedId, setOpenedId] = useState("")

    function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {

        const target = e.target as HTMLElement
        const id = target.getAttribute("data-id")

        if(openedId === id){
            setOpenedId("")
        }
        else{
            setOpenedId(id || "")
        }
    }

    const item = [
        {title: "Step 1", text: "Text 1", id: "step-1-id"},
        {title: "Step 2", text: "Text 2", id: "step-2-id"},
        {title: "Step 3", text: "Text 3", id: "step-3-id"}
    ]

    return (
        <>
            <MainLayouts active={1}>
                <div className="w-full h-full my-10 mx-auto ml-32 mt-48">

                    <div className="w-5/12 bg-main-dark h-fit pb-4 rounded-box mr-5 rounded-2xl float-left mb-10">
                        <div className="w-11/12 mx-auto mt-4 text-center text-white">
                            <h1 className="w-full text-left mb-10">Admin</h1>
                            {item.map((e) => {
                                return (<FAQBlock handleClick={handleClick} title={e.title} text={e.text} id={e.id} openedId={openedId} />)
                            })}
                        </div>
                    </div>

                    <div className="w-5/12 bg-main-dark h-fit pb-4 rounded-box mr-5 rounded-2xl float-left mb-10">
                        <div className="w-11/12 mx-auto mt-4 text-center text-white">
                            <h1 className="w-full text-left mb-10">Seller</h1>
                           {item.map((e) => {
                            return (<FAQBlock handleClick={handleClick} title={e.title} text={e.text} id={e.id} openedId={openedId} />)
                        })}
                        </div>
                    </div>

                    <div className="w-5/12 bg-main-dark h-fit pb-4 rounded-box mr-5 rounded-2xl float-left mb-10">
                        <div className="w-11/12 mx-auto mt-4 text-center text-white">
                            <h1 className="w-full text-left mb-10">Worker</h1>
                            {item.map((e) => {
                            return (<FAQBlock handleClick={handleClick} title={e.title} text={e.text} id={e.id} openedId={openedId} />)
                        })}
                        </div>
                    </div>

                    <div className="w-5/12 bg-main-dark h-fit pb-4 rounded-box mr-5 rounded-2xl float-left mb-10">
                        <div className="w-11/12 mx-auto mt-4 text-center text-white">
                            <h1 className="w-full text-left mb-10">TechAdmin</h1>
                            {item.map((e) => {
                                return (<FAQBlock handleClick={handleClick} title={e.title} text={e.text} id={e.id} openedId={openedId} />)
                            })}
                        </div>
                    </div>

                </div>
            </MainLayouts>
        </>
    );
};

export default Faq;

export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res}) => {
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

        return {props: {}}
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});