import React, {useState} from 'react';
import {getCookie} from "cookies-next";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {wrapper} from "../../../store";
import {fetchCurrentUser}  from "../../../store/action-creators/user";
import MainLayouts from "../../../layouts/MainLayout";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";


const AddAdmin = () => {
    const {currentUser, usersInfo} = useTypeSelector(state => state.user)
    const token = currentUser.token

    const [select, setSelect] = useState<string>("")

    const handleChange = (e: React.MouseEvent<HTMLElement>) => {
        setSelect(e.target.value)
    }

    return (
        <MainLayouts active={2}>
            <div className="w-11.5/12 ml-20  h-full overflow-x-hidden">
                <div className="w-11/12 rounded-2xl flex flex-col justify-center mx-auto mt-16 h-fit pb-32 rounded-box bg-main-dark">
                    <div className="flex text-white text-2xl ml-20 pt-16">Add new admin</div>
                    <div className="form-control w-full flex flex-row flex-wrap justify-center text-white mt-6">
                        <TextField placeholder="Login"
                                   className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Username"
                                   className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Email"
                                   className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Mobile NO"
                                   className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <TextField placeholder="Password"
                                   className="bg-main-dark-2 border-none text-white w-5/12 mr-6 mt-6"/>
                        <div className="flex w-5/12 items-center justify-center mr-6 mt-6">
                            <FormControl className="w-full">
                                <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                                <Select className="w-full bg-main-dark-2"
                                        label="Role" value={select} onChange={handleChange}>
                                    <MenuItem value={'Homer'}>Homer</MenuItem>
                                    <MenuItem value={'Marge'}>Marge</MenuItem>
                                    <MenuItem value={'Bart'}>Bart</MenuItem>
                                    <MenuItem value={'Lisa'}>Lisa</MenuItem>
                                    <MenuItem value={'Maggie'}>Maggie</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="w-full mt-16 flex flex-row justify-end">
                            <Button className="w-4/12 mx-auto" variant="outlined" color="success">Add Admin</Button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayouts>
    );
};

export default AddAdmin;

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