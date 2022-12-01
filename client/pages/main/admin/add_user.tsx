import React, {FC, useEffect, useState} from 'react';
import {getCookie} from "cookies-next";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {wrapper} from "../../../store";
import UserTable from "../../../components/TableItems/TableChildrens/UserTable";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import {fetchFilter} from "../../../store/action-creators/global";

import {IUsersInfo} from "../../../types/user";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import MainLayouts from "../../../layouts/MainLayout";


const AddUser = () => {
    const {currentUser, usersInfo} = useTypeSelector(state => state.user)
    const token = currentUser.token


    return (
        <MainLayouts active={0}>
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-full text-white text-3xl ml-20 mt-16">Dashboard</div>

                <div className="w-11/12 flex flex-col justify-center mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark">
                    <div className="flex text-white text-2xl ml-20 pt-16">Add new user</div>
                    <div className="form-control w-full flex flex-row flex-wrap justify-center text-white mt-6">
                        <TextField placeholder="Login" className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Username" className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Email" className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Mobile NO" className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Password" className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <div className="flex w-5/12 items-center justify-center mr-6 mt-6">
                            <Select className="w-full bg-main-dark-2 ">
                                <MenuItem value={'Homer'}>Homer</MenuItem>
                                <MenuItem value={'Marge'}>Marge</MenuItem>
                                <MenuItem value={'Bart'}>Bart</MenuItem>
                                <MenuItem value={'Lisa'}>Lisa</MenuItem>
                                <MenuItem value={'Maggie'}>Maggie</MenuItem>
                            </Select>
                        </div>
                        <Button className="w-11/12 mx-auto mt-16 bg-green">Add User</Button>
                    </div>
                </div>
            </div>
         </MainLayouts>
    );
};

export default AddUser;

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
        await store.dispatch(fetchFilter(token, 50, "partmodels", false, {}))

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