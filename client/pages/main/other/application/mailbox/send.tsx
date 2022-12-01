import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../../../../hooks/useTypeSelector";
import MainLayouts from "../../../../../layouts/MainLayout";
import {wrapper} from "../../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../../store/action-creators/user";
import {getParameterByName} from "../../../../../helpers/getParamsFromUrl";
import {useAction} from "../../../../../hooks/useAction";
import {useRouter} from "next/router";
import {MailCreateDto} from "../../../../../dto/MailCreate.dto";
import {Button, Input, TextField} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';


const Send = () => {

    const {currentUser} = useTypeSelector(state => state.user)
    const {MailInfo, error} = useTypeSelector(state => state.mail)
    const token = currentUser.token
    const {fetchCurrentUser, fetchSendMail} = useAction()
    const router = useRouter()

    const [mail_data, setMailData] = useState({})
    const [form, setForm] = useState<MailCreateDto>(
        {
            from: currentUser._id,
            message: "",
            to: "",
            short_name: "",
        }
    )

    useEffect(() => {
        const _id_reply_mail = getParameterByName("_id", window.location.href)
        const mail_reply_name = getParameterByName("reply_mail", window.location.href)
        const to = getParameterByName("to", window.location.href)

        if(_id_reply_mail && mail_reply_name && to){
            setForm({...form, ["to"]: to})
            setMailData({id: _id_reply_mail, name: mail_reply_name })
        }
    }, [])

    useEffect(() => {
        if(MailInfo._id !== ""){
            // send notification
        }
    }, [MailInfo, error]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        fetchSendMail(token, form)
    }

    const users = [
        {label: "Admin", value: "Admin"},
        {label: "User", value: "User"},
        {label: "Seller", value: "Seller"},
    ]

    return (

        <MainLayouts active={1}>
            <div className="w-full h-full my-10 mx-auto flex flex-row ml-32 mt-48 justify-center">
                <div className="w-3/12 h-fit bg-main-dark rounded-box mr-32 rounded-2xl">
                    <div className="w-full flex justify-center items-center ">
                        <div className="w-full h-fit flex flex-col justify-center items-center text-center bg-main-dark rounded-2xl">
                            <h1 className="mt-10 mb-4">Send mail to another person</h1>
                            <div className="w-full h-fit flex flex-row justify-center items-center text-center mt-4">
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="To"
                                    value={form.to}
                                    size="medium"
                                    onChange={changeHandler}
                                    name="to"
                                    className="w-4/12 mb-4"
                                    variant="standard"
                                >
                                    {users.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>

                            </div>
                            <div className="w-full h-fit flex flex-col justify-center items-center text-center">
                                <TextField id="title" label="Title" size="medium" variant="standard" name="title" className="w-4/12 mb-4"  onChange={changeHandler}/>
                            </div>
                            <div className="w-full h-fit flex flex-col justify-center items-center text-center">
                                <TextField
                                    id="message" label="Message" size="medium" variant="outlined" name="title" className="w-4/12 mb-4"
                                    multiline
                                    rows={10}
                                    defaultValue="Message" />
                            </div>
                            <Button variant="outlined" color="success" className="mb-10 mt-4" onClick={submitHandler}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayouts>
    );
};

export default Send;

export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res, query}) => {
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
              // @ts-ignore
        await store.dispatch(fetchCurrentUser(token))
        //@ts-ignore
        return {props: {}}
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});