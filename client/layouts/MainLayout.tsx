import React, {FC} from 'react';
import Head from "next/head";
import {IUser} from "../types/user";
import {ILaptopModelFilterData} from "../components/Sidebar/childrens/filters/Sidebar_ILaptopModel";
import {IPartModelFilterData} from "../components/Sidebar/childrens/filters/Sidebar_IPartModel";
import {useTypeSelector} from "../hooks/useTypeSelector";
import MainNavbar from "../components/MainNavbar/MainNavbar";
import Alert from "../components/Alert/Alert";
import CustomAlert from "../components/Alert/Alert";

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    filterSubmitHandler?: (data: ILaptopModelFilterData | IPartModelFilterData) => void,
    active: number | undefined,
}

const MainLayouts: React.FC<MainLayoutProps> = ({children, title, description, keywords, active, filterSubmitHandler}) => {


    return (
        <>
            <Head>
                <title>{title || 'CanadaLaptop'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            {filterSubmitHandler ?
                (
                    <MainNavbar filterSubmitHandler={filterSubmitHandler}/>
                )
            :
                (
                    <MainNavbar />
                )}
            <CustomAlert />
            <div className="w-full">
                {children}
            </div>
        </>
    );
};

export default MainLayouts;