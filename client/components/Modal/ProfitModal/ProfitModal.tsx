import React, {FC, useEffect, useState} from 'react';
import {Box, Modal, Typography, Menu, MenuItem, FormControl, InputLabel, Select, Button} from "@mui/material";


interface IProfitModalProps {
    visible: boolean,
    onClick: () => void
}

const ProfitModal: FC<IProfitModalProps> = ({visible, onClick}) => {

    if (!visible) {
        return (<></>)
    }

    const changeHandler = () => {

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
                    Get profit from laptop model
                </Typography>
                <hr className="w-11/12 mx-auto"/>
                <div className="w-11/12 mx-auto h-full flex flex-col">
                    <FormControl className="mx-8 w-4/12 mt-10">
                        <InputLabel id="demo-simple-select-label">Laptop model</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Laptop model"
                            onChange={changeHandler}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="w-full flex flex-row justify-end h-12 my-10">
                        <Button color="error" variant="outlined" className="w-2/12 mx-2" onClick={onClick}>Cancel</Button>
                        <Button color="success" variant="outlined" className="w-2/12 mx-2">Check</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ProfitModal;