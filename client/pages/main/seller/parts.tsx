import React, {MouseEventHandler, useEffect, useState} from 'react';
import {getCookie} from "cookies-next";
import {wrapper} from "../../../store";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {fetchFilteredPart, fetchPart} from "../../../store/action-creators/part";
import {fetchCurrentUser, fetchUsers} from "../../../store/action-creators/user";
import {fetchFilter} from "../../../store/action-creators/global";
import MainLayouts from "../../../layouts/MainLayout";
import CustomTable from "../../../components/Table";
import {item_types} from "../../../constants/global_const";
import {Button, TextField} from "@mui/material";
import {useAction} from "../../../hooks/useAction";
import {useInput} from "../../../hooks/useInput";
import {initialPartFilterData, IPartFilterData} from '../../../components/Sidebar/childrens/filters/Sidebar_IPart';


const Parts = () => {
    const {fetchFilteredPart, fetchFilter, fetchPart} = useAction()
    const {currentUser} = useTypeSelector(state => state.user)
    const {Parts, error} = useTypeSelector(state => state.part)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {count, page} = GlobalStateInfo
    const token = currentUser.token

    const search = useInput("")

    useEffect(() => {
        if(!GlobalStateInfo.filter){
            fetchPart(token, count, page)
            fetchFilter(token, count, "parts", false, {})
        }
        fetchFilteredPart(GlobalStateInfo.filterValue as IPartFilterData)
    }, [token, count, page])

    const searchHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
        if(search.value === ""){
            fetchPart(token, count, page)
            fetchFilter(token, count, "parts", false, {})
            return
        }
        fetchFilter(token, count, "parts", true, {...initialPartFilterData, search: search.value})
        fetchFilteredPart( {...initialPartFilterData, search: search.value})
    }

    return (
        <MainLayouts active={2}>
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-11/12 p-2 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark rounded-2xl">
                    <div className="w-full mb-8 flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Parts list</div>
                        <div className="w-4/12 pt-16 flex justify-end">
                            <TextField {...search} type="text" placeholder="Search" className="mx-2 bg-main-dark-2 border-none"/>
                            <Button className="mx-4 w-24" variant="outlined" color="success" onClick={searchHandler}>Search</Button>
                        </div>
                    </div>
                    <CustomTable  item_type={item_types.Part}/>
                </div>
            </div>
        </MainLayouts>
    );
};

export default Parts;

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

        const {page, count} = store.getState().global.GlobalStateInfo

        await store.dispatch(fetchCurrentUser(token))
        await store.dispatch(fetchPart(token, count, page))
        await store.dispatch(fetchUsers(token, {}))
        await store.dispatch(fetchFilter(token, count, "parts", false, {}))

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
