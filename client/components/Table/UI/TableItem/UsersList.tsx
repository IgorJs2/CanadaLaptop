import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import {
    Avatar,
} from '@mui/material';
import {IUser} from "../../../../types/user";

interface IUsersItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: IUser,
    labelId: string
}

const UsersItem: FC<IUsersItem> = ({handleClick, isItemSelected, item, labelId}) => {

    const time_count = (item._time[0] ? item._time.reduce((e) => e) : 0)

    // @ts-ignore
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
                    src={`${item.avatar}`}
                    className="mb-2"
                />
            </TableCell>
            <TableCell align="left">{item.full_name}</TableCell>
            <TableCell align="left">{item.email}</TableCell>
            <TableCell align="left">{item.mobile}</TableCell>
            <TableCell align="left">{item.type}</TableCell>
            <TableCell align="left">{item._role?.name || ""}</TableCell>
            <TableCell align="left">{time_count}</TableCell>
        </TableRow>
    );
};

export default UsersItem;