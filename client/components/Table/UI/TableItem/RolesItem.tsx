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
import {IRole} from "../../../../types/role";

interface IRolesItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: IRole,
    labelId: string
}

const RolesItem: FC<IRolesItem> = ({handleClick, isItemSelected, item, labelId}) => {


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
            <TableCell align="left">{item.name}</TableCell>
            <TableCell align="left">{item._permissions}</TableCell>
            {item.active ? (
                <TableCell align="left"><div className="bg-green rounded-2xl">Active</div></TableCell>
            ) : (
                <TableCell align="left"><div className="bg-red rounded-2xl">Not-Active</div></TableCell>
            )}
        </TableRow>
    );
};

export default RolesItem;