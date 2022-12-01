import React, {FC, useEffect} from 'react';
import {GetServerSideProps} from "next";
import {getCookie} from "cookies-next";
import ListWindow from "../../../components/ListWindow/ListWindow";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import MainLayouts from "../../../layouts/MainLayout";
import {wrapper} from "../../../store";
import {fetchPart} from "../../../store/action-creators/part";
import {TransferList} from "../../../components/TransferList";


const Send = () => {
    const {currentUser} = useTypeSelector(state => state.user)
    const {Parts} = useTypeSelector(state => state.part)
    const token = currentUser.token


    return (
        <MainLayouts active={2}>
            <div className="w-full h-full my-10 mx-auto">
                <TransferList items={Parts} category_left={3.1} category_right={3.2} title_left={"Need to send"} title_right={"Sended"}></TransferList> {/*3.1 and 3.2 is value of part status in part_const*/}
            </div>
        </MainLayouts>
    );
};

export default Send;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res}) => {
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

        const {page, count} = store.getState().global.GlobalStateInfo

        await store.dispatch(fetchCurrentUser(token))
        await store.dispatch(fetchPart(token, count, page))

        if(store.getState().user.currentUser.type !== "Seller"){
            return{
                redirect: {
                    permanent: false,
                    destination: "/main"
                }
            }
        }
        return {props: {}}
    } catch (e) {
        return { props: {} }
        console.log(e)
    }
});
