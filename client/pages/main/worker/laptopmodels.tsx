import React, {MouseEventHandler, useEffect} from 'react';
import {getCookie} from "cookies-next";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {fetchLaptopModels} from "../../../store/action-creators/laptopmodels";
import {wrapper} from "../../../store";
import {useAction} from "../../../hooks/useAction";
import {fetchFilter} from "../../../store/action-creators/global";
import {fetchCurrentUser} from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import CustomTable from "../../../components/Table";
import {useInput} from "../../../hooks/useInput";
import {
    ILaptopModelFilterData,
    initialLaptopModelFilterData
} from "../../../components/Sidebar/childrens/filters/Sidebar_ILaptopModel";
import {item_types} from "../../../constants/global_const";


const LaptopModels = () => {
    const {fetchLaptopModels, fetchFilteredLaptopModels, fetchFilter} = useAction()
    const {LaptopModelInfo, error} = useTypeSelector(state => state.laptopmodel)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {page, count} = GlobalStateInfo
    const {currentUser} = useTypeSelector(state => state.user)
    const token = currentUser.token

    const search = useInput("")

    useEffect(() => {
        if(!GlobalStateInfo.filter){
            fetchLaptopModels(token, count, page)
            fetchFilter(token, count, "laptopmodels", false, {})
        }
        fetchFilteredLaptopModels( GlobalStateInfo.filterValue as ILaptopModelFilterData)
    }, [token, count, page])

    const searchHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
        if(search.value === ""){
            fetchLaptopModels(token, count, page)
            fetchFilter(token, count, "laptopmodels", false, {})
            return
        }
        fetchFilter(token, count, "laptopmodels", true, {...initialLaptopModelFilterData, search: search.value})
        fetchFilteredLaptopModels( {...initialLaptopModelFilterData, search: search.value, }, token)
    }

    return (
        <MainLayouts active={1}>
            <div className="centralized_table_block">
                <div className="w-11/12 p-2 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark rounded-2xl">
                    <div className="w-full mb-8 flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Laptop Models list</div>
                        <div className="w-4/12 pt-16 flex justify-end">
                            <TextField {...search} type="text" placeholder="Search" className="mx-2 bg-main-dark-2 border-none"/>
                            <Button className="mx-4 w-24" variant="outlined" color="success" onClick={searchHandler}>Search</Button>
                        </div>
                    </div>
                    <CustomTable  item_type={item_types.LaptopModel}/>
                </div>
            </div>
        </MainLayouts>
    );
};



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
        await store.dispatch(fetchLaptopModels(token, count, page))
        await store.dispatch(fetchFilter(token, count, "laptopmodels", false, {}))

        if(store.getState().user.currentUser.type !== "Worker"){
            return{
                redirect: {
                    permanent: false,
                    destination: "/main"
                }
            }
        }
        return {props: {}}
        return { props: {} }
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});

export default LaptopModels;


