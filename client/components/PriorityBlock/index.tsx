import React, {FC, useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import EmptyBlock from "../ListWindow/childrens/EmptyBlock";
import PriorityItem from "./UI/PriorityItem";
import {ILaptopPriorityModel} from "../../types/laptopmodel";

type PriorityBlockProps = {
    header: string,
    items: ILaptopPriorityModel[]
}

const PriorityBlock: FC<PriorityBlockProps> = ({header, items}) => {

    return (
        <div className="w-1/4 h-96 bg-main-dark rounded-2xl mx-8 overflow-y-scroll">
            <Typography variant="h6" className="w-11/12 mx-auto" gutterBottom component="div">
                {header}
            </Typography>
            <hr className="w-11/12 mx-auto text-white"/>
            <div className="w-full h-10/12">
                {!items[0] ?
                    (
                        <EmptyBlock/>
                    )
                    : (
                        <>
                            {items.map((item) => {
                                if(header !== item.best_category){
                                    return <></>
                                }

                                return (
                                    <PriorityItem item={item}/>
                                )
                            })}
                        </>
                    )}
            </div>
        </div>
    );
};

export default PriorityBlock;