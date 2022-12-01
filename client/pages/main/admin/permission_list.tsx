import React, {FC, useEffect, useState} from 'react';
import {getCookie} from "cookies-next";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {wrapper} from "../../../store";
import {fetchCurrentUser}  from "../../../store/action-creators/user";

import PermissionTable from "../../../components/TableItems/TableChildrens/PermissionTable";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import CustomTable from "../../../components/Table";


const PermissionList = () => {
    const {currentUser, usersInfo} = useTypeSelector(state => state.user)
    const [count, setCount] = useState(50)
    const [page, setPage] = useState(1)
    const token = currentUser.token

    const items = [
        {Id: "1", status: false, module_name: "Get_Laptops", operations: "Do something", roleList: ["aboba"]},
        {Id: "2", status: false, module_name: "PermissionPage", operations: "Do something", roleList: ["aboba", "aboba"]}
    ]

    const changeStatusHandler = (event: React.MouseEvent<HTMLElement>) => {
        console.log(1)
    }


    return (
        <MainLayouts active={2}>
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-full text-white text-3xl ml-20 mt-16">Dashboard</div>

                <div className="w-11/12 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark">
                    <div className="w-full flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Permission list</div>
                        <div className="w-4/12 pt-16 flex justify-end">
                            <TextField type="text" placeholder="Search" className="mx-2 bg-main-dark-2 border-none"/>
                            <Button className="bg-green mx-4 w-24">Search</Button>
                        </div>
                    </div>
                    <CustomTable />
                </div>
            </div>
         </MainLayouts>
    );
};

export default PermissionList;

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


