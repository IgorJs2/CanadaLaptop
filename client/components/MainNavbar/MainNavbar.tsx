import React, {FC, useEffect, useState} from 'react';
import UserWindow from "../UserWindow/UserWindow";
import SideBar from "../Sidebar/SideBar";
import {openShortSidebarHandler} from "../Sidebar/handlers/OpenSidebarHandler";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {ILaptopModelFilterData} from "../Sidebar/childrens/filters/Sidebar_ILaptopModel";
import {IPartModelFilterData} from "../Sidebar/childrens/filters/Sidebar_IPartModel";
import NotificationWindow from "../NotificationWindow/NotificationWindow";
import MailWindow from "../MailWindow/MailWindow";


interface MainNavbarProps {
    filterSubmitHandler?: (data: ILaptopModelFilterData | IPartModelFilterData) => void,
}

const MainNavbar: FC<MainNavbarProps> = ({filterSubmitHandler}) => {

    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {currentUser} = useTypeSelector(state => state.user)

    return (
        <div className="bg-main-dark h-20 flex flex-row justify-center items-center text-center">
            <div className="flex px-2 mx-2 justify-center items-center text-center">
                <SideBar filterType={GlobalStateInfo.filterType} submitHandler={filterSubmitHandler}></SideBar>
                <i className='bx bx-list-ul text-white text-2xl my-2 p-2 hover:bg-second-dark rounded-2xl transition-all'
                   onClick={(e) => {
                       openShortSidebarHandler(e)
                   }}></i>
            </div>

            <div className="flex-1 px-2 mx-2">
                <div className="flex items-stretch">

                </div>
            </div>

            <div className="px-2 mx-2 flex flex-row justify-center items-center text-center">
                <MailWindow />
                <NotificationWindow />
                <UserWindow profile={currentUser}/>
            </div>

        </div>

    )
};

export default MainNavbar;
