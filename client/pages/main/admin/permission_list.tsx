import React from 'react';
import {getCookie} from "cookies-next";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {wrapper} from "../../../store";
import {fetchCurrentUser} from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import CustomTable from "../../../components/Table";
import {item_types} from "../../../constants/global_const";
import {fetchPermission} from "../../../store/action-creators/permission";


const PermissionList = () => {

    const changeStatusHandler = (event: React.MouseEvent<HTMLElement>) => {
        console.log(1)
    }

    const searchHandler = (e: any) => {

    }

    return (
            <MainLayouts active={2}>
                <div className="centralized_table_block">
                    <div className="w-11/12 p-2 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark rounded-2xl">
                        <div className="w-full mb-8 flex flex-row">
                            <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Permission list</div>
                            <div className="w-4/12 pt-16 flex justify-end">
                                <TextField type="text" placeholder="Search" className="mx-2 bg-main-dark-2 border-none"/>
                                <Button className="mx-4 w-24" variant="outlined" color="success" onClick={searchHandler}>Search</Button>
                            </div>
                        </div>
                        <CustomTable  item_type={item_types.Permission}/>
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
        await store.dispatch(fetchPermission(token))

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


