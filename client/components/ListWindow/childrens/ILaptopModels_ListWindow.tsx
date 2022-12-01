import React, {FC} from 'react';
import {ILaptopModel} from "../../../types/laptopmodel";

type ListItemBlockProps = {
    item: ILaptopModel & { Quantity: string };
    onClick: (e: any) => {}
}

const ILaptopModelsListWindow: FC<ListItemBlockProps> = ({item, onClick}) => {
    return (
        <div className="w-11/12 mx-auto rounded-box bg-main-dark-2 min-h-24 h-fit my-4 text-white flex flex-row justify-start items-center text-center hover:scale-105 transition-all" onClick={onClick}>
            <div className="w-full flex flex-col justify-center items-center overflow-hidden mx-1">
                <div className="w-full text-left ">Model:{item.Model}</div>
                <div className="w-full text-left ">Quantity:{item.Quantity}</div>
                <div className="w-full text-left">Profit:{item.Profit}</div>
                <div className="w-full text-left">AmountPaid:{item.AmountPaid}</div>
            </div>
        </div>
    );
};

export default ILaptopModelsListWindow;