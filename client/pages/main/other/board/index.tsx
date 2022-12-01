import React from 'react';
import Link from "next/link";
import BoardTaskComponent from "../../../../components/BoardTaskComponent/index";
import MainLayouts from "../../../../layouts/MainLayout";
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../store/action-creators/user";

const Index = () => {



    return (
        <MainLayouts active={2} >
                <div className="w-full h-full my-10 mx-auto flex flex-row ml-36 mt-48">
                    <div className="w-11/12 h-96 rounded-box mr-5">
                        <BoardTaskComponent />
                    </div>
                </div>
        </MainLayouts>
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

        return {props: {}}
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});