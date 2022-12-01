import React from 'react';
import {Divider, InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import CustomTable from "../Table";
import {wrapper} from "../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../store/action-creators/user";
import {fetchMail} from "../../store/action-creators/mail";

const Index = () => {
    return (
        <div className="w-11/12 mx-auto p-4 h-fit flex flex-col justify-center items-center text-center">
            <div className="w-full flex flex-row ">
                <div className="w-6/12 flex justify-start items-center text-center">
                    <h1 className="text-1-5-xl">Igor Urmach</h1>
                </div>
                <div className="w-6/12 flex justify-center items-end">
                    <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search/>
                                <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
                            </InputAdornment>
                        ),
                    }} id="outlined-basic" label="Search content here..." variant="outlined" color="info"
                               className="my-4 float-left w-full"/>
                </div>
            </div>
            <div className="w-full flex flex-row ">
                {/*<CustomTable  item_type={}/>*/}
            </div>
        </div>
    );
};

export default Index;

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

        await store.dispatch(fetchMail(token))

        return {props: {}}
    } catch (e) {
        return {props: {}}
        console.log(e)
    }

});
