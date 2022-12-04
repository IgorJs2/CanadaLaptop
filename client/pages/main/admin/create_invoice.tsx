import React, {useState} from 'react';
import {getCookie} from "cookies-next";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {wrapper} from "../../../store";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";


const CreateInvoice = () => {
    const {currentUser, usersInfo} = useTypeSelector(state => state.user)
    const token = currentUser.token

    const [select, setSelect] = useState<string>("")

    const handleChange = (e: React.MouseEvent<HTMLElement>) => {
        setSelect(e.target.value)
    }

    return (
        <MainLayouts active={2}>
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-6/12 rounded-2xl flex flex-col justify-center items-center mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark">
                    <div className="flex text-white text-2xl pt-16">Create invoice</div>
                    <div className="w-full flex flex-col justify-center items-center text-white mt-6">
                        <TextField placeholder="From"
                                   className="bg-main-dark-2 border-none text-white w-8/12 mr-6 mt-6"/>
                        <TextField placeholder="To"
                                   className="bg-main-dark-2 border-none text-white w-8/12 mr-6 mt-6"/>
                        <TextField placeholder="Title"
                                   className="bg-main-dark-2 border-none text-white w-8/12 mr-6 mt-6"/>
                        <TextField placeholder="ebayList"
                                   className="bg-main-dark-2 border-none text-white w-8/12 mr-6 mt-6"/>
                        <TextField placeholder="price"
                                   className="bg-main-dark-2 border-none text-white w-8/12 mr-6 mt-6"/>
                        <div className="w-full mt-16 flex flex-row justify-end">
                            <Button className="w-4/12 mx-auto" variant="outlined" color="success">Submit</Button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayouts>
    );
};

export default CreateInvoice;

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

        await store.dispatch(fetchCurrentUser(token))

        if (store.getState().user.currentUser.type !== "Admin") {
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