import React, {FC} from 'react';
import {ILaptopModel, ILaptopMostBuyedPriorityModel} from "../../../types/laptopmodel";

type ListItemBlockProps = {
    item: ILaptopMostBuyedPriorityModel
}

const MostBuyed: FC<ListItemBlockProps> = ({item}) => {
    return (
        <div className="w-11/12 mx-auto rounded-box bg-main-dark-2 min-h-24 h-fit my-4 text-white flex flex-row justify-start items-center text-center hover:scale-105 transition-all">
            <div className="w-full flex flex-col justify-center items-center overflow-hidden mx-1">
                <div className="w-full text-left ">Model name:{item.model}</div>
                <div className="w-full text-left ">Count:{item.value}</div>
            </div>
        </div>
    );
};

export default MostBuyed;