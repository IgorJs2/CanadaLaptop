import React, {FC, useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import {IParts} from "../../../../types/parts";
import {ILaptop} from "../../../../types/laptop";
import FormEditList from "../../../FormEditList";
import {useAction} from "../../../../hooks/useAction";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {TTableArrayObjects, TTableObjects} from "../../../../types/subtypes/Object_subtypes";
import ItemsList from "./UI/ItemsList";

interface IDeleteItemModalProps {
    visible: boolean,
    onClick: () => void
    items: TTableObjects[]
}

const InfoItemModal: FC<IDeleteItemModalProps> = ({visible, onClick, items}) => {

    if (!visible) {
        return (<></>)
    }

    return (
        <Modal
            open={visible}
            onClose={onClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="w-full hfull flex justify-center items-center text-center"
        >
            <div className="w-4/12 min-h-96 h-fit bg-main-dark rounded-2xl">
                <Typography id="modal-modal-title" variant="h6" component="h2" className="my-4 text-left w-11/12 mx-auto">
                    Info
                </Typography>
                <hr className="w-11/12 mx-auto"/>

                <ItemsList  items={items} />

                <div className="flex flex-row justify-end h-12 my-10 w-11/12 mx-auto">
                    <Button color="error" variant="outlined" className="w-2/12 mx-2" onClick={onClick}>Close</Button>
                </div>
            </div>
        </Modal>
    );
};

export default InfoItemModal;