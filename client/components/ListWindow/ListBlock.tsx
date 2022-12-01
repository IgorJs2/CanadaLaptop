import React, {FC, useEffect, useState} from 'react';
import {} from "../../types/laptopmodel";
import MostBuyed from "./childrens/MostBuyed_ListWindow";
import {IParts} from "../../types/parts";
import ILaptopModels_Modal_ListWindow from "./childrens/ILaptopModels_ListModalWindow";
import ILaptopModelsListWindow from "./childrens/ILaptopModels_ListWindow";
import IPartListWindow from "./childrens/IPartListWindow";
import IPartListModalWindow from "./childrens/IPartListModalWindow";
import EmptyBlock from "./childrens/EmptyBlock";
import {Typography} from "@mui/material";

type ListBlockProps = {
    header: string,
    item_statuses: number[],
    item: IParts[]
}

const ListBlock: FC<ListBlockProps> = ({header, item, item_statuses}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [ID, setID] = useState<string>("")

    return (
        <div className="w-1/4 h-200 bg-main-dark rounded-2xl mx-8 overflow-y-scroll">
            <Typography variant="h6" className="w-11/12 mx-auto" gutterBottom component="div">
                {header}
            </Typography>
            <hr className="w-11/12 mx-auto text-white"/>
            <div className="w-full h-10/12">
                {!item[0] ?
                    (
                        <EmptyBlock/>
                    )
                    : (
                        <>
                            {item.map((e) => {
                                if(item_statuses.includes(e.item_status)){
                                    return (
                                        <>
                                            <IPartListModalWindow item={e} visible={visible}
                                                                  onClick={() => setVisible(!visible)}
                                                                  id={e._id}
                                                                  choosedId={ID}></IPartListModalWindow>
                                            <IPartListWindow item={e} onClick={(elem) => {
                                                elem.preventDefault()
                                                setVisible(!visible);
                                                setID(e._id)
                                            }}/>
                                        </>
                                    )
                                }
                            })}
                        </>
                    )}
            </div>
        </div>
    );
};

export default ListBlock;