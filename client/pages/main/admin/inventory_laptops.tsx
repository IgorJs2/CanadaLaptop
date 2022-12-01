import React, {useEffect, useState} from 'react';
import {getCookie} from "cookies-next";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {wrapper} from "../../../store";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import {fetchFilter} from "../../../store/action-creators/global";
import {fetchFilteredLaptop, fetchLaptop} from "../../../store/action-creators/laptop";
import {useAction} from "../../../hooks/useAction";
import TableItems from "../../../components/TableItems/TableItems";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, TextField} from "@mui/material";
import CustomTable from "../../../components/Table";


const InventoryLaptops = () => {
    const {fetchFilter, fetchLaptop} = useAction()
    const {currentUser} = useTypeSelector(state => state.user)
    const {LaptopInfo, error} = useTypeSelector(state => state.laptop)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const [count, setCount] = useState(50)
    const [page, setPage] = useState(1)
    const token = currentUser.token

    useEffect(() => {
        if(GlobalStateInfo.filter){
            fetchFilteredLaptop(currentUser.token, count, page,  GlobalStateInfo.filterValue, GlobalStateInfo.sort_value)
            return;
        }
        fetchLaptop(currentUser.token, count, page)
        fetchFilter(currentUser.token, count, "Laptop", false, {})
    }, [currentUser.token, count, page])

    // @ts-ignore
    const filterSubmitHandler = (data) => {
        fetchFilteredLaptop(token, count, page, data, GlobalStateInfo.sort_value)
        fetchFilter(token, count, "Laptopmodels", true, data)
    }

    return (
        <MainLayouts active={2} filterSubmitHandler={filterSubmitHandler}>
                <div className="w-full h-full my-10 mx-auto flex flex-row ml-36 mt-48">
                    <div className="w-11/12 bg-main-dark h-fit rounded-box mr-5">
                        <div className="w-11/12 mx-auto mt-16 h-fit rounded-box bg-main-dark">
                            <div className="w-full flex flex-row">
                                <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Laptop list</div>
                                <div className="w-4/12 pt-16 flex justify-end">
                                    <TextField type="text" placeholder="Search" className="mx-2 bg-main-dark-2 border-none"/>
                                    <Button className="bg-green mx-4 w-24">Search</Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-11/12 h-full my-4 mx-auto flex flex-row ml-32 mt-12">
                            <CustomTable />
                        </div>
                    </div>
                </div>
         </MainLayouts>
    );
};

export default InventoryLaptops;

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

        await store.dispatch(fetchLaptop(token, 50, 1))
        await store.dispatch(fetchFilter(token, 50, "Laptop", false, {}))
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
