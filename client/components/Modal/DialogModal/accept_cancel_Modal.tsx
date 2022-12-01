import React, {FC} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";

interface IAcceptCancelModalProps {
    visible: boolean,
    onClick: () => void,
    change_text: string,
    callback: (type: string | undefined) => void,
    type?: string
}

const AcceptCancelModal: FC<IAcceptCancelModalProps> = ({visible, onClick, change_text, callback, type}) => {
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
            <div className="min-w-96 w-fit px-10 min-h-96 h-fit bg-main-dark rounded-2xl">
                <Typography id="modal-modal-title" variant="h6" component="h2" className="my-4">
                    Are you sure that you want to {change_text}
                </Typography>
                <hr className="w-11/12 mx-auto"/>
                <div className="w-11/12 mx-auto h-full flex flex-col">
                    <div className="w-full flex flex-row justify-end h-12 my-10">
                        <Button color="error" variant="outlined" className="w-2/12 mx-2" onClick={onClick}>Cancel</Button>
                        <Button color="success" variant="outlined" className="w-2/12 mx-2" onClick={(e) => {
                            callback(type)
                            onClick()
                        }}>Submit</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AcceptCancelModal;