import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IPartListWindow from "../ListWindow/childrens/IPartListWindow";
import {IParts} from "../../types/parts";
import {FC, useState} from "react";
import {PartStatus} from "../../constants/part_const";
import { customList } from './UI/customList';
import {handleToggle} from "./handlers/handleToggle";
import intersection from './function/intersection';
import {handleCheckedRight} from "./handlers/handleCheckedRight";
import {handleCheckedLeft} from "./handlers/handleCheckedLeft";
import {Typography} from "@mui/material";
import AcceptCancelModal from "../Modal/DialogModal/accept_cancel_Modal";


interface ITransferListProps {
    title_left: string,
    title_right: string
   items: IParts[],
    category_left: number,
    category_right: number
}

export const TransferList: FC<ITransferListProps> = ({title_left, title_right, items, category_left,category_right}) => {
    const [checked, setChecked] = useState<IParts[]>([]);
    const [left, setLeft] = useState<IParts[]>([...items].filter((item) => item.item_status === category_left));
    const [right, setRight] = useState<IParts[]>([...items].filter((item) => item.item_status === category_right));

    const [accept_change, setAcceptChange] = useState<boolean>(false)
    const [type, setType] = useState<string>("")
    const [visible, setVisible] = useState<boolean>(false)

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const customList_toggleHandler = (item: IParts) => {
        handleToggle(item, checked, setChecked)
    }

    const accept_after_dialog = (type: string) => {
        if(type === "Left"){
            handleCheckedLeft(setRight, setLeft, right, left, setChecked, checked, rightChecked)
        }
        else{
            handleCheckedRight(setRight, setLeft, right, left, setChecked, checked, leftChecked)
        }
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <AcceptCancelModal  callback={() => accept_after_dialog(type)} change_text={"change part status"} onClick={() => setVisible(false)} visible={visible}/>
            <Grid item>
                <Typography>
                    {title_left}
                </Typography>
                {customList(left, customList_toggleHandler, checked)}
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="large"
                        onClick={(e) => {
                            setVisible(true)
                            setType("Right")
                        }}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                        color="success"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="large"
                        onClick={(e) => {
                            setVisible(true)
                            setType("Left")
                        }}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                        color="error"
                    >
                        &lt;
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <Typography>
                    {title_right}
                </Typography>
                {customList(right, customList_toggleHandler, checked)}
            </Grid>
        </Grid>
    );
}
