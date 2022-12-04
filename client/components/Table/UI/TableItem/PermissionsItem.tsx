import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import {IPermission} from "../../../../types/permission";
import {Button} from "@mui/material";

interface IPermissionsItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: IPermission,
    labelId: string
}

const MailsItem: FC<IPermissionsItem> = ({handleClick, isItemSelected, item, labelId}) => {

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
            <TableCell align="left">{item.permission}</TableCell>
            <TableCell align="left">
                {item.active ?
                    (
                        <Button variant='outlined' color="success">Active</Button>
                    )
                :
                        (
                            <Button variant='outlined' color="error">DisActived</Button>
                        )
                }
            </TableCell>
        </TableRow>
    );
};

export default MailsItem;