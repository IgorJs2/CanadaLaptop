import React, {MouseEventHandler, useEffect, useState} from 'react';
import {getCookie} from "cookies-next";
import {wrapper} from "../../../store";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {
    fetchFilteredLaptopModels,
    fetchLaptopModels, fetchLaptopModelsFromIdArray,
    fetchPriorityLaptopModels
} from "../../../store/action-creators/laptopmodels";
import {useAction} from "../../../hooks/useAction";
import ProfitModal from "../../../components/Modal/ProfitModal/ProfitModal";
import {fetchFilter, fetchMaxPage} from "../../../store/action-creators/global";
import {fetchCurrentUser} from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, TextField, Typography} from "@mui/material";
import CustomTable from "../../../components/Table";
import {item_types, PriorityHeaders} from "../../../constants/global_const";
import {useInput} from "../../../hooks/useInput";
import PriorityBlock from "../../../components/PriorityBlock";
import {initialLaptopModelFilterData} from "../../../components/Sidebar/childrens/filters/Sidebar_ILaptopModel";


const Priority = () => {
    const {fetchLaptopModels, fetchFilteredLaptopModels, fetchFilter} = useAction()
    const {currentUser} = useTypeSelector(state => state.user)
    const {Priority, error} = useTypeSelector(state => state.laptopmodel)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {page, count} = GlobalStateInfo
    const [visible, setVisible] = useState(false)
    const token = currentUser.token
    const [priority_headers, setPriorityHeaders] = useState<string[]>(PriorityHeaders)

    const search = useInput("")

    useEffect(() => {
        if(!GlobalStateInfo.filter){
            fetchLaptopModels(token, count, page)
            fetchFilter(token, count, "laptopmodels", false, {})
        }
    }, [token, count, page])

    const searchHandler = (e: MouseEventHandler<HTMLButtonElement>) => {
        fetchFilter(token, count, "laptopmodels", true, {search: search.value})
        fetchFilteredLaptopModels( {...initialLaptopModelFilterData, search: search.value}, token)
    }

    return (
        <MainLayouts active={2}>
            <ProfitModal visible={visible} onClick={() => setVisible(!visible)}/>
            <div className="w-full h-full my-10 mx-auto flex flex-row ml-56 mt-48" id="for-alert">
                {priority_headers.map((headers) => {

                    return (
                        <PriorityBlock header={headers} items={Priority}/>
                    )
                })}
            </div>
            <div className="flex flex-row justify-center items-center ">
                <div className="w-10/12 flex justify-center items-center">
                    <div className=" ml-96 text-white text-2xl rounded-2xl p-4 w-1/6 flex justify-center items-center bg-main-dark">
                        <Typography variant="h5" gutterBottom component="h5">
                            Details
                        </Typography>
                    </div>
                </div>
                <div className="w-2/12"><Button variant="outlined" color="info"
                                                onClick={() => setVisible(!visible)}>Get profit from Laptop
                    model</Button></div>
            </div>
            <div className="centralized_table_block">
                <div className="w-11/12 p-2 mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark rounded-2xl">
                    <div className="w-full mb-8 flex flex-row">
                        <div className="flex w-8/12 text-white text-2xl ml-20 pt-16">Laptop Models list</div>
                        <div className="w-4/12 pt-16 flex justify-end">
                            <TextField {...search} type="text" placeholder="Search"
                                       className="mx-2 bg-main-dark-2 border-none"/>
                            <Button className="mx-4 w-24" variant="outlined" color="success" onClick={searchHandler}>Search</Button>
                        </div>
                    </div>
                    <CustomTable item_type={item_types.LaptopModel} />
                </div>
            </div>
        </MainLayouts>
    );
};

export default Priority;


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
        await store.dispatch(fetchLaptopModels(token, count, page))
        await store.dispatch(fetchFilter(token, count, "laptopmodels", false, {}))
        await store.dispatch(fetchPriorityLaptopModels(token))

        if (store.getState().user.currentUser.type !== "Seller") {
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
