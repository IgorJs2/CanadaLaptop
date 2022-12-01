import React, {MouseEvent, useEffect, useState} from 'react';
import MainLayouts from "../../../../layouts/MainLayout";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../store/action-creators/user";
import {fetchFilter, fetchFilterType} from "../../../../store/action-creators/global";
import {fetchPriorityLaptopModels} from "../../../../store/action-creators/laptopmodels";
import {useAction} from "../../../../hooks/useAction";
import {fetchMail} from "../../../../store/action-creators/mail";
import {Badge, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StarRateIcon from '@mui/icons-material/StarRate';
import SendIcon from '@mui/icons-material/Send';
import {useRouter} from "next/router";
import MailList from "../../../../components/MailList";


const Mailbox = () => {

    const {Mails} = useTypeSelector(state => state.mail)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {fetchFilterType} = useAction()
    const router = useRouter()

    function redirectToSendPage(event: MouseEvent<HTMLButtonElement>) {
        router.push({pathname: "mailbox/send"})
    }

    return (
       <>
           <MainLayouts active={1}>
               <div className="w-full h-full my-10 mx-auto flex flex-row ml-32 mt-48">
                   <div className="w-3/12 bg-main-dark h-fit pb-4 rounded-box mr-5 rounded-2xl">
                       <div className="w-11/12 mx-auto mt-4 text-center text-white">
                           <div className="w-full h-full text-white flex flex-col justify-center items-center">
                               <Button color="info" variant="outlined" className="w-full" onClick={redirectToSendPage}>Send mail</Button>
                               <List className="w-full">
                                   <ListItem disablePadding>
                                       <ListItemButton>
                                           <ListItemIcon>
                                               <InboxIcon />
                                           </ListItemIcon>
                                           <ListItemText primary="Inbox" />
                                           <Badge badgeContent={4} color="warning"> </Badge>
                                       </ListItemButton>
                                   </ListItem>
                                   <ListItem disablePadding>
                                       <ListItemButton>
                                           <ListItemIcon>
                                               <SendIcon />
                                           </ListItemIcon>
                                           <ListItemText primary="Sended" />
                                       </ListItemButton>
                                   </ListItem>
                                   <ListItem disablePadding>
                                       <ListItemButton>
                                           <ListItemIcon>
                                               <StarRateIcon />
                                           </ListItemIcon>
                                           <ListItemText primary="Stared" />
                                       </ListItemButton>
                                   </ListItem>
                                   <ListItem disablePadding>
                                       <ListItemButton component="a" href="#simple-list">
                                           <ListItemIcon>
                                               <RemoveCircleIcon />
                                           </ListItemIcon>
                                           <ListItemText primary="Spam" />
                                           <Badge badgeContent={4} color="error"> </Badge>
                                       </ListItemButton>
                                   </ListItem>
                                   <ListItem disablePadding>
                                       <ListItemButton component="a" href="#simple-list">
                                           <ListItemIcon>
                                               <DeleteIcon />
                                           </ListItemIcon>
                                           <ListItemText primary="Trash" />
                                       </ListItemButton>
                                   </ListItem>
                               </List>
                           </div>
                       </div>
                   </div>
                   <div className="w-8/12 h-fit bg-main-dark rounded-box ml-5 rounded-2xl">
                        <MailList />
                   </div>
               </div>
           </MainLayouts>

       </>
    );
};

export default Mailbox;

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
        await store.dispatch(fetchMail(token))
        await store.dispatch(fetchFilterType("MailFilter"))

        return {props: {}}
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});