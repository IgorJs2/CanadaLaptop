import React, {useState} from 'react';
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser, fetchUser} from "../../../../store/action-creators/user";
import {fetchMailInfo} from "../../../../store/action-creators/mail";
import {fetchFilterType} from "../../../../store/action-creators/global";
import MainLayouts from "../../../../layouts/MainLayout";
import {Status, WeekDay} from "../../../../types/subtypes/board_task_subtype";

const BoardId = () => {

    const [todo, setTodo] = useState(
        {
            _id: Date.now().toString(),
            created_by: "Ihor",
            task: "Make code",
            description: "Make more code tatartaerar",
            status: Status.ToDo,
            from: "Systme",
            to: "Ihorka",
            doDay: WeekDay.Monday

        }
    )

    return (
       <>
           <MainLayouts active={1}>
               <div className="w-full h-full my-10 mx-auto flex flex-row ml-36 mt-48">
                   <div className="w-11/12 bg-main-dark h-96 rounded-box mr-5">
                       {}
                   </div>
               </div>
           </MainLayouts>
       </>
    );
};

export default BoardId;

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