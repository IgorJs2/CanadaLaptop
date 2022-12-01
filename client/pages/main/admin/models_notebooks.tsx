import React, {FC, useEffect, useState} from 'react';
import {getCookie} from "cookies-next";
import TableItems from "../../../components/TableItems/TableItems";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {fetchLaptopModels, LaptopModelFilterType} from "../../../store/action-creators/laptopmodels";
import {NextThunkDispatch, wrapper} from "../../../store";
import {useAction} from "../../../hooks/useAction";
import {fetchFilter, fetchMaxPage} from "../../../store/action-creators/global";
import {useRouter} from "next/router";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import CustomTable from "../../../components/Table";

const ModelsLaptops = () => {
    const {fetchLaptopModels, fetchFilteredLaptopModels, fetchFilter} = useAction()
    const {LaptopModelInfo, error} = useTypeSelector(state => state.Laptopmodel)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {currentUser} = useTypeSelector(state => state.user)
    const [count, setCount] = useState(50)
    const [page, setPage] = useState(1)
    const token = currentUser.token

    useEffect(() => {
        if(GlobalStateInfo.filter){
            fetchFilteredLaptopModels(token, count, page,  GlobalStateInfo.filterValue, GlobalStateInfo.sortValue)
            return;
        }
        fetchLaptopModels(token, count, page)
        fetchFilter(token, count, "Laptopmodels", false, {})
    }, [token, count, page])


    const filterSubmitHandler = (data: any) => {
        fetchFilteredLaptopModels(token, count, page, data, GlobalStateInfo.sortValue)
        fetchFilter(token, count, "Laptopmodels", true, data)
    }

    return (
        <MainLayouts active={2} filterSubmitHandler={filterSubmitHandler}  >
            {/*@ts-ignore*/}
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-full text-white text-3xl ml-20 mt-16">Dashboard</div>

                <div className="w-11/12 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark">
                    <div className="w-full flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Laptop models list</div>
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



export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res}) => {
    try {
        // @ts-ignore
        const token = getCookie("token", {req, res}) ? JSON.parse(getCookie("token", {req, res})?.toString()) : null

        await store.dispatch(fetchLaptopModels(token, 50, 1))
        await store.dispatch(fetchFilter(token, 50, "Laptopmodels", false, {}))
        await store.dispatch(fetchCurrentUser(token))

        if(store.getState().user.currentUser.type !== "Admin"){
            return{
                redirect: {
                    permanent: false,
                    destination: "/main"
                }
            }
        }
        return { props: {} }
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});

export default ModelsLaptops;


