import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import {
    Avatar,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';
import {MenuProps} from "../../const";
import {IMail} from "../../../../types/mail";

interface IMailsItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: IMail,
    labelId: string
}

const MailsItem: FC<IMailsItem> = ({handleClick, isItemSelected, item, labelId}) => {

    console.log(item)

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={item._id}
            selected={isItemSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    onClick={(event) => handleClick(event, item._id)}
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="normal"
            >
                <Avatar
                    variant="rounded"
                    src={`${item.from.avatar}`}
                    className="ml-14 mb-2"
                />
               {item.from.full_name}
            </TableCell>
            <TableCell align="left">{item.short_name}</TableCell>
            <TableCell align="left">{item.message.length > 12 ? item.message.slice(0, 10) + "..." : item.message}</TableCell>
            <TableCell align="left">{item.date || "12.09"}</TableCell>
        </TableRow>
    );
};

export default MailsItem;