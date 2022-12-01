import React, {useEffect} from 'react';
import {getCookie} from "cookies-next";
import {wrapper} from "../../store";
import {fetchCurrentUser} from "../../store/action-creators/user";


const Index = () => {
    return (
        <></>
    );
};

export default Index;

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
        return{
            redirect: {
                permanent: false,
                destination: "/main/admin/home"
            }
        }
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});