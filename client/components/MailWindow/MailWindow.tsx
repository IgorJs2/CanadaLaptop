import React, {FC, useState} from 'react';
import {useRouter} from "next/router";
import {IMail} from "../../types/mail";
import Mail from "./UI/Mail";
import MailModal from "./UI/MailModal";
import {openModalHandler} from "../../handlers/openModalHandler";
import MailIcon from '@mui/icons-material/Mail';
import { Badge, IconButton } from '@mui/material';
import {useTypeSelector} from "../../hooks/useTypeSelector";




const MailWindow = () => {
    const router = useRouter()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalId, setModalId] = useState("")

    const {Mails} = useTypeSelector(state => state.mail)

    const redirectToMailHandler = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement
        const id = target.getAttribute("data-id")
        router.push("/main/other/mail/" + id)
    }



    //item.sort((e) => !e.checked ? 1 : 0)

    const checked = [...Mails].reduce((total, x) => (x.checked==false ? total+1 : total), 0)

    return (
        <>
            <IconButton aria-label="cart" id="mail-icon" onClick={openModalHandler} className="mx-2">
                <Badge badgeContent={checked} max={999} color="primary" className="roundex-2xl text-2xl pointer-events-none">
                    <MailIcon color="action" className="pointer-events-none" />
                </Badge>
            </IconButton>


            {/*!Important not put here any code*/}

            <div id="mail_window" className="modal-window hidden w-96 h-48 absolute top-14 right-5 bg-main-dark-2 rounded-box justify-start items-center text-center flex flex-col z-50 overflow-y-scroll overflow-x-hidden" >
                {Mails.map((e) => {
                    return (
                        <div key={e._id} className="w-full h-full py-2 rounded-2xl">
                            <Mail mail={e} onClick={redirectToMailHandler} data-id={e._id}/>
                            <MailModal visible={modalVisible} id={modalId} onClick={() => setModalVisible(!modalVisible)} mail={e} />
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default MailWindow;
