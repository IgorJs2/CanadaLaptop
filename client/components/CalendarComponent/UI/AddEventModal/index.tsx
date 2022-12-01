import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Button, Modal, Select, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {timeArray} from "../../const";
import moment from "moment";
import {Datepicker} from "../DatePicker";
import {useInput} from "../../../../hooks/useInput";

interface IAddEventModalProps {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>
    cancelButtonHandler: () => void,
    changeEventHandler: (text: any, field: any) => void
    eventFetchHandler: () => void,
    removeEventHandler: () => void,
    method: string,
    event: any
}



const Index: FC<IAddEventModalProps> = ({visible, setVisible, changeEventHandler, eventFetchHandler, removeEventHandler, cancelButtonHandler, method, event}) => {

    const [nowTime, setNowTime] = useState<string>("")
    const [date, setDate] = useState<string>("")
    const title = useInput("")
    const description = useInput("")
    const start_time = useInput("")
    const expire_time = useInput("")


    useEffect(() => {
        setNowTime(moment().format("YYYY/MM/DD"))
    })

    return (
        <Modal
            open={visible}
            onClose={() => setVisible(!visible)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="w-full hfull flex justify-center items-center text-center"
        >
            <div className="w-4/12 min-h-96 h-fit bg-main-dark rounded-2xl" onClick={e => e.stopPropagation()}>
                <div className="w-full h-fit flex flex-col justify-center items-center text-center">
                    <TextField id="title" label="Title" size="medium" variant="standard" name="title" className="w-4/12 mb-4"  onChange={(e) => {changeEventHandler(e.target.value, "title")}}/>
                </div>
                <div className="w-full h-fit flex flex-col justify-center items-center text-center">
                    <TextField
                        id="description" label="Description" size="medium" variant="outlined" name="description" className="w-4/12 mb-4"
                        multiline
                        rows={10}
                        defaultValue="Description" />
                </div>
                <div className="w-full h-fit flex flex-row justify-center items-center text-center mt-4">
                    <div className="mr-4">Start time:</div>
                    <Select
                        id="outlined-select-currency"
                        label="Time"
                        defaultValue="00:00"
                        size="medium"
                        onChange={(e) => {changeEventHandler(e.target.value, "start_time")}}
                        name="time"
                        className="w-4/12 mb-4"
                        variant="standard"
                    >
                        {timeArray.map((e) => {
                            return (
                                <MenuItem value={e}>{e}</MenuItem>
                            )
                        })}
                    </Select>
                </div>
                <div className="w-full h-fit flex flex-row justify-center items-center text-center mt-4">
                    <div className="mr-4">Expire time:</div>
                    <Select
                        id="outlined-select-currency"
                        label="Time"
                        defaultValue="00:00"
                        size="medium"
                        onChange={(e) => {changeEventHandler(e.target.value, "expire_time")}}
                        name="time"
                        className="w-4/12 mb-4"
                        variant="standard"
                    >
                        {timeArray.map((e) => {
                            return (
                                <MenuItem value={e}>{e}</MenuItem>
                            )
                        })}
                    </Select>
                </div>

                <div className="w-full h-fit flex flex-row justify-center items-center text-center mt-4">
                    <div className="mr-4">Date:</div>
                    <Datepicker currentDate={nowTime} date={date} setDate={setDate} setCurrentDate={setNowTime}/>
                </div>

                <Button variant="outlined" color="success" className="mb-10 mt-4" onClick={eventFetchHandler}>Create event</Button>
            </div>
        </Modal>
    );
};

export default Index;