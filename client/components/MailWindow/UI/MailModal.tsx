import React, {FC} from 'react';
import {IMail} from "../../../types/mail";
import {Menu, MenuItem, Modal, Typography} from "@mui/material";

type MailModalProps = {
    visible: boolean,
    onClick: () => void,
    mail: IMail,
    id: string
}

const MailModal: FC<MailModalProps> = ({visible, onClick, mail, id}) => {

        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        if (!visible || id !== mail._id) {
            return (<></>)
        }

        return (
            <Modal
                open={visible}
                onClose={onClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="w-full hfull flex justify-center items-center text-center rounded-2xl"
            >
                <div className="w-4/12 min-h-96 h-fit bg-main-dark rounded-2xl">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="bg-main-dark text-white w-full flex justify-start items-center text-center text-2xl">
                            From: {mail.from}
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            className="w-full flex flex-col bg-main-dark"
                            >
                            <div
                                className="bg-main-dark text-white w-full flex justify-start items-center text-center text-2xl">
                                Text:
                            </div>
                            <MenuItem className="w-full flex flex-row justify-start mt-2 text-white">
                                {mail.message}
                            </MenuItem>

                        </Menu>
                    </Typography>
                </div>
            </Modal>
        );
};

export default MailModal;