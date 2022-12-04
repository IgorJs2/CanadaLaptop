import React, {MouseEventHandler, useEffect} from 'react';
import {getCookie} from "cookies-next";
import {wrapper} from "../../../store";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {fetchFilteredLaptop, fetchLaptop} from "../../../store/action-creators/laptop";
import {useAction} from "../../../hooks/useAction";
import {fetchCurrentUser, fetchUsers} from "../../../store/action-creators/user";
import {fetchFilter} from "../../../store/action-creators/global";
import MainLayouts from "../../../layouts/MainLayout";
import CustomTable from "../../../components/Table";
import {Button, TextField} from "@mui/material";
import {useInput} from "../../../hooks/useInput";
import {item_types} from "../../../constants/global_const";
import {
    ILaptopFilterData,
    initialLaptopFilterData
} from "../../../components/Sidebar/childrens/filters/Sidebar_ILaptop";


const Laptops = () => {
    const {fetchFilter, fetchFilteredLaptop, fetchLaptop} = useAction()
    const {currentUser} = useTypeSelector(state => state.user)
    const {LaptopInfo, error} = useTypeSelector(state => state.laptop)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {page, count} = GlobalStateInfo
    const token = currentUser.token
    const { users, usersInfo} = useTypeSelector(state => state.user)

    const search = useInput("")

    useEffect(() => {
        if (!GlobalStateInfo.filter) {
            fetchLaptop(currentUser.token, count, page)
            fetchFilter(currentUser.token, count, "laptop", false, {})
        }
        fetchFilteredLaptop(GlobalStateInfo.filterValue as ILaptopFilterData)
    }, [currentUser.token, count, page])

    const searchHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
        if(search.value === ""){
            fetchLaptop(token, count, page)
            fetchFilter(token, count, "laptop", false, {})
            return
        }
        fetchFilter(token, count, "laptop", true, {...initialLaptopFilterData, search: search.value})
        fetchFilteredLaptop( {...initialLaptopFilterData, search: search.value}, token)
    }

    return (
        <MainLayouts active={1}>
            <div className="centralized_table_block">
                <div className="w-11/12 p-2 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark rounded-2xl">
                    <div className="w-full mb-8 flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Laptop list</div>
                        <div className="w-4/12 pt-16 flex justify-end">
                            <TextField {...search} type="text" placeholder="Search" className="mx-2 bg-main-dark-2 border-none"/>
                            <Button className="mx-4 w-24" variant="outlined" color="success" onClick={searchHandler}>Search</Button>
                        </div>
                    </div>
                    <CustomTable  item_type={item_types.Laptop}/>
                </div>
            </div>
        </MainLayouts>
    );
};


export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res}) => {
    try {
        // @ts-ignore
        const token = getCookie("token", {req, res}) ? JSON.parse(getCookie("token", {req, res})?.toString()) : null

        if (!token) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/"
                }
            }
        }

        const {page, count} = store.getState().global.GlobalStateInfo


        await store.dispatch(fetchCurrentUser(token))
        await store.dispatch(fetchUsers(token, {}))
        await store.dispatch(fetchLaptop(token, count, page))
        await store.dispatch(fetchFilter(token, count, "laptop", false, {}))

        if (store.getState().user.currentUser.type !== "Worker") {
            return {
                redirect: {
                    permanent: false,
                    destination: "/main"
                }
            }
        }
        return {props: {}}
    } catch (e) {
        return {props: {}}
        console.log(e)
    }

});

export default Laptops;
