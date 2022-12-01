import {Modal, Typography} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';

import {IParts} from "../../../types/parts";

type ILaptopModels_Modal_ListWindowProps = {
    item: IParts,
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
        <Modal open={visible}
               onClose={onClick}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
               className="w-full hfull flex justify-center items-center text-center">
            <div className="w-4/12 min-h-96 h-fit bg-main-dark rounded-2xl">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <div className="bg-main-dark text-white w-full flex justify-center items-center text-center text-2xl">
                        Part info
                    </div>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {/*<Menu*/}
                    {/*    id="demo-positioned-menu"*/}
                    {/*    aria-labelledby="demo-positioned-button"*/}
                    {/*    anchorEl={anchorEl}*/}
                    {/*    open={open}*/}
                    {/*    onClose={handleClose}*/}
                    {/*    anchorOrigin={{*/}
                    {/*        vertical: 'top',*/}
                    {/*        horizontal: 'left',*/}
                    {/*    }}*/}
                    {/*    transformOrigin={{*/}
                    {/*        vertical: 'top',*/}
                    {/*        horizontal: 'left',*/}
                    {/*    }}*/}
                    {/*    // className="bg-base-100 w-full flex flex-col bg-main-dark"*/}
                    {/*    >*/}
                    {/*     <MenuItem className="w-full flex flex-row justify-center" onClick={handleClose}>*/}
                    {/*        1*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem className="w-full flex flex-row justify-center" onClick={handleClose}>*/}
                    {/*        2*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem className="w-full flex flex-row justify-center" onClick={handleClose}>*/}
                    {/*        3*/}
                    {/*    </MenuItem>*/}
                    {/*</Menu>*/}
                </Typography>
            </div>
        </Modal>
    );
};

export default ILaptopModels_Modal_ListWindow;