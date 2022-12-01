import React, {useEffect} from 'react';
import {IUser} from "../../types/user";
import {GetServerSideProps} from "next";
import {getCookie} from "cookies-next";
import axios from "axios";
import {useRouter} from "next/router";
import {wrapper} from "../../store";
import {fetchCurrentUser} from "../../store/action-creators/user";

const Index = () => {

   return (
        <div></div>
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

        await store.dispatch(fetchCurrentUser(token))

        if(store.getState().user.currentUser.type !== "Worker"){
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
                destination: "/main/worker/laptops"
            }
        }
    } catch (e) {
        console.log(e)
        return { props: {} }
    }

});