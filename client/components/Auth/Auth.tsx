import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useCookie} from "../../hooks/useCookie";
import {useAction} from "../../hooks/useAction";
import {Button, TextField} from "@mui/material";
import CustomAlert from "../Alert/Alert";
import {alertService} from "../Alert/service/alert.service";
import {useTypeSelector} from "../../hooks/useTypeSelector";


const AuthComponent = () => {
    const {setCookieForAuth, checkToken} = useCookie()
    const {Autorize} = useAction()
    const {currentUser, error} = useTypeSelector(state => state.user)
    const router = useRouter()

    const [form, setForm] = useState(
        {
            username: "",
            password: "",
        }
    )

    useEffect(() => {
        if(currentUser.token && currentUser.token !== ""){
            setCookieForAuth(currentUser.token)
            router.push("/main")
        }
    }, [currentUser.token]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setForm({...form, [target.name]: target.value});
    }

    const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if(form){
                Autorize(form)
                if(error !== ""){
                    alertService.error({message: error, severity: "error"}, { autoClose: true, keepAfterRouteChange: false })
                    return;
                }
                alertService.success({message: "Success authorize", severity: "success"}, { autoClose: true, keepAfterRouteChange: false })
            }
        } catch (e: any) {
            alertService.error({message: e.toString(), severity: "error"}, { autoClose: true, keepAfterRouteChange: false })
        }
    }

    return (
        <>

            <div className="w-full flex justify-start items-center m-4">
                <h2>Canada Laptops</h2>
            </div>

            <CustomAlert />

            <div className="w-full mt-96 flex justify-center items-center ">
                <div className="w-3/12 h-fit flex flex-col justify-center items-center text-center bg-main-dark rounded-2xl">
                    <h1 className="mt-10">Authorize in System</h1>
                    <div className="w-full h-fit flex flex-row justify-center items-center text-center mt-4">
                        <TextField id="username" label="Username" variant="standard" size="medium" name="username" className="w-4/12 mb-4" onChange={changeHandler} />
                    </div>
                    <div className="w-full h-fit flex flex-col justify-center items-center text-center">
                        <TextField id="password" label="Password" type="password" size="medium" variant="standard" name="password" className="w-4/12 mb-4"  onChange={changeHandler}/>
                    </div>
                    <Button variant="outlined" color="success" className="mb-10 mt-4" onClick={submitHandler}>Authorize</Button>
                </div>
            </div>

        </>
    )
};

export default AuthComponent;