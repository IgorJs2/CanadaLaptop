import React, {FC, useState} from 'react';
import {Badge, Button, IconButton} from "@mui/material";
import {removeCookies} from "cookies-next";
import {useRouter} from "next/router";
import {IUser} from "../../types/user";
import {openModalHandler} from "../../handlers/openModalHandler";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


type UserWindowT ={
   profile?: IUser | null,
}

const UserWindow: FC<UserWindowT> = ({profile}) => {
    const router = useRouter()
    const [visible, setVisible] = useState(false)

    const logoutHandler = () => {
        removeCookies("token")
        router.push("/")
    }


    return (
        <>
            <IconButton aria-label="cart" id="mail-icon" onClick={openModalHandler} className="mx-2">
                <AccountCircleIcon color="action" className="pointer-events-none" />
            </IconButton>

            <div id="user_window" className="modal-window w-48 h-32 absolute top-14 right-5 bg-main-dark-2 rounded-2xl justify-center items-center text-center flex flex-col z-50 hidden">
                <div className="text-white text-2xl mb-auto pt-4">
                    {profile?.login}
                </div>
                <Button color="error" variant="outlined" className="w-1/2 text-center mb-4 justify-center items-center flex" onClick={logoutHandler}><i className='bx bx-log-out '></i>Logout</Button>
            </div>
        </>
    );
};

export default UserWindow;
