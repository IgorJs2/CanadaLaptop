import React from 'react';
import {Divider, InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import CustomTable from "../Table";
import {wrapper} from "../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../store/action-creators/user";
import {fetchMail} from "../../store/action-creators/mail";
import {item_types} from "../../constants/global_const";

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
                <CustomTable  item_type={item_types.Mail}/>
            </div>
        </div>
    );
};

export default Index;
