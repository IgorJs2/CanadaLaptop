import React, { useState} from 'react';
import {getCookie} from "cookies-next";
import {wrapper} from "../../../store";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {fetchPart} from "../../../store/action-creators/part";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import {fetchFilter} from "../../../store/action-creators/global";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import CustomTable from "../../../components/Table";



const InventoryParts = () => {
    const {currentUser} = useTypeSelector(state => state.user)
    const {Parts ,error} = useTypeSelector(state => state.part)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const [count, setCount] = useState(50)
    const [page, setPage] = useState(1)
    const token = currentUser.token

    const filterSubmitHandler = (data) => {
        // fetchFilteredPartModels(token, count, page, data, GlobalStateInfo.sortValue)
        // fetchFilter(token, count, "Laptopmodels", true, data)
    }

    return (
        <MainLayouts active={2} >
            {/*@ts-ignore*/}
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-full text-white text-3xl ml-20 mt-16">Dashboard</div>

                <div className="w-11/12 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark">
                    <div className="w-full flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Laptop list</div>
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

export default InventoryParts;

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
        await store.dispatch(fetchFilter(token, 50, "parts", false, {}))
        await store.dispatch(fetchPart(token, 50, 1))

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
