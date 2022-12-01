import React, {FC} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Typography} from "@mui/material";

interface IDeleteItemModalProps {
    visible: boolean,
    onClick: () => void,
    names: readonly string[]
}

const DeleteItemModal: FC<IDeleteItemModalProps> = ({visible, onClick, names}) => {

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
                    Delete Confirmation
                </Typography>
                <hr className="w-11/12 mx-auto"/>
                <div className="w-11/12 bg-medium-red mb-10 mt-4 min-h-12 h-fit text-center flex justify-left items-center mx-auto bg-opacity-70 rounded-2xl">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="my-4 mx-4 text-light-red">
                        Are you sure you want to delete {names.map((name, i) => <>{i === names.length - 1 ? name : name + ", "}</>)}
                    </Typography>
                </div>

                <hr className="w-11/12 mx-auto"/>

                <div className="flex flex-row justify-end h-12 my-10 w-11/12 mx-auto">
                    <Button color="error" variant="outlined" className="w-2/12 mx-2" onClick={onClick}>Cancel</Button>
                    <Button color="success" variant="outlined" className="w-2/12 mx-2" onClick={() => {}}>Submit</Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteItemModal;