import React, {FC} from 'react';
import "./SideBar.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
import SidebarMenu from "./childrens/left-side-menu/SidebarMenu";
import SidebarFilter from "./childrens/left-side-menu/SidebarFilter";

type SidebarProps = {

}

const SideBar: FC<SidebarProps> = ({}) => {

    const {currentUser} = useTypeSelector(state => state.user)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {filterType} = GlobalStateInfo

    return (
        <>
            <SidebarMenu user={currentUser}/>
            {filterType ? (<SidebarFilter filterType={filterType}/>) : (<></>)}
        </>
    );
};

export default SideBar;