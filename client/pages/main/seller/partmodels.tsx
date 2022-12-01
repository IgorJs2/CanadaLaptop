import React, {MouseEventHandler, useEffect, useState} from 'react';
import {getCookie} from "cookies-next";
import {wrapper} from "../../../store";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {fetchCurrentUser} from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";
import {useAction} from "../../../hooks/useAction";
import {fetchFilter} from "../../../store/action-creators/global";
import {fetchPartModels} from "../../../store/action-creators/partmodels";
import CustomTable from "../../../components/Table";
import {item_types} from "../../../constants/global_const";
import {useInput} from "../../../hooks/useInput";
import {Button, TextField} from "@mui/material";
import {
    initialPartModelFilterData,
    IPartModelFilterData
} from "../../../components/Sidebar/childrens/filters/Sidebar_IPartModel";


const Parts = () => {
    const {fetchFilteredPartModels, fetchFilter, fetchPartModels} = useAction()
    const {currentUser} = useTypeSelector(state => state.user)
    const {PartModelInfo, error} = useTypeSelector(state => state.partmodel)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {count, page} = GlobalStateInfo
    const token = currentUser.token

    const search = useInput("")

    useEffect(() => {
        if(!GlobalStateInfo.filter){
            fetchPartModels(token, count, page)
            fetchFilter(token, count, "partmodels", false, {})
        }
        fetchFilteredPartModels(GlobalStateInfo.filterValue as IPartModelFilterData)
    }, [token, count, page])

    const searchHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
        if(search.value === ""){
            fetchPartModels(token, count, page)
            fetchFilter(token, count, "partmodels", false, {})
            return
        }
        fetchFilter(token, count, "partmodels", true, {...initialPartModelFilterData, search: search.value})
        fetchFilteredPartModels( {...initialPartModelFilterData, search: search.value, }, token)
    }

    return (
        <MainLayouts active={2}>
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-11/12 p-2 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark rounded-2xl">
                    <div className="w-full mb-8 flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Part Models list</div>
                        <div className="w-4/12 pt-16 flex justify-end">
                            <TextField {...search} type="text" placeholder="Search" className="mx-2 bg-main-dark-2 border-none"/>
                            <Button className="mx-4 w-24" variant="outlined" color="success" onClick={searchHandler}>Search</Button>
                        </div>
                    </div>
                    <CustomTable  item_type={item_types.PartModel}/>
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
        await store.dispatch(fetchPartModels(token, count, page))
        await store.dispatch(fetchFilter(token, count, "partmodels", false, {}))

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
