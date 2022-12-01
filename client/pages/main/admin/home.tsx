import React, {FC, useEffect} from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {wrapper} from "../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";


const Home = () => {
    const {currentUser} = useTypeSelector(state => state.user)
    const token = currentUser.token

    return (
        <MainLayouts active={2}>

        </MainLayouts>
    );
};

export default Home;

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
              // @ts-ignore
        await store.dispatch(fetchCurrentUser(token))
        // @ts-ignore
        if(store.getState().user.currentUser.type !== "Admin"){
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