import React, {FC, useEffect, useState} from 'react';

import {ILaptopModel} from "../../../types/laptopmodel";

type ILaptopModels_Modal_ListWindowProps = {
    item: ILaptopModel,
    visible: boolean,
    onClick: () => void,
    id: string
    choosedId: string,
}

const ILaptopModels_Modal_ListWindow: FC<ILaptopModels_Modal_ListWindowProps> = ({item, visible, onClick, id, choosedId}) => {

    if (!visible || id !== choosedId) {
        return (<></>)
    }


    return (
        <Modal open={visible} onClickBackdrop={onClick} className="bg-main-dark w-2/4 ">
            <Modal.Header>
                <div className="bg-main-dark text-white w-full flex justify-center items-center text-center text-2xl">
                    Laptop model info
                </div>
            </Modal.Header>

            <Modal.Body>
                <>
                    <Menu className="bg-base-100 w-full flex flex-col bg-main-dark">
                        <Menu.Item className="w-full flex flex-row justify-center">

                        </Menu.Item>
                        <Menu.Item className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit">
                            ItemID:{item.ItemID}
                        </Menu.Item>
                        <Menu.Item className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit">
                            Title:{item.Title}
                        </Menu.Item>
                        <Menu.Item
                            className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit breakText">
                            AmountPaid: {item.AmountPaid + "$"}
                        </Menu.Item>
                        <Menu.Item
                            className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit breakText">
                            DaysFromPaym: {item.DaysFromPaym}
                        </Menu.Item>
                        <Menu.Item
                            className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit breakText">
                            ItemStatus: {item.ItemStatus}
                        </Menu.Item>
                        <Menu.Item
                            className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit breakText">
                            Model:{item.Model}
                        </Menu.Item>
                        <Menu.Item
                            className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit breakText">
                            Profit:{item.Profit}
                        </Menu.Item>
                        <Menu.Item
                            className="w-full flex flex-row justify-start text-white text-2xl my-2 h-fit breakText">
                            {/*@ts-ignore*/}
                            Quantity:{item.Quantity}
                        </Menu.Item>

                    </Menu>
                </>

            </Modal.Body>

            <Modal.Actions>
                {/*<Button color="success" className="text-white">*/}
                {/*    Accept*/}
                {/*</Button>*/}
                {/*<Button onClick={onClick} color="error" className="text-white">Cancel</Button>*/}
            </Modal.Actions>
        </Modal>
    );
};

export default ILaptopModels_Modal_ListWindow;