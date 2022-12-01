import React from 'react';
import {getCookie} from "cookies-next";
import ListWindow from "../../../components/ListWindow/ListWindow";
import {Button} from "@mui/material";
import {wrapper} from "../../../store";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import MainLayouts from "../../../layouts/MainLayout";
import {useInput} from "../../../hooks/useInput";
import {useAction} from "../../../hooks/useAction";

const Inventory = () => {

    const {currentUser} = useTypeSelector(state => state.user)
    const {Parts} = useTypeSelector(state => state.part)
    const {fetchQueryPart} = useAction()
    const token = currentUser.token
    const search_id = useInput("")

    const searchHandler = () => {
        fetchQueryPart(token, {_laptopSearchID: search_id.value})
    }

    return (
        <MainLayouts active={5}>
            <div className="w-9/12 mx-auto h-full flex flex-col justify-center">
                <div className="w-1/4 flex flex-row justify-center items-center my-11 ml-20 ">
                    <input className="w-48 rounded-box bg-main-dark-2 text-white p-2" placeholder='Laptop ID' {...search_id}/>
                    <Button variant="outlined" color="success" className="mx-4" onClick={searchHandler}>{">"}</Button>
                </div>
                <ListWindow headers={["On Box", "Selled", "Need to Return", "Other"]}
                            item_statuses={[[1, 2], [3], [0.1], [0.2, 0]]} items={Parts}/>
            </div>
        </MainLayouts>
    );
};

export default Inventory;


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

        if(store.getState().user.currentUser.type !== "Worker"){
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
