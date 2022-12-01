import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import {IInvoice} from "../../../../types/invoice";

interface IInvoicesItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: IInvoice,
    labelId: string
}

const InvoicesItem: FC<IInvoicesItem> = ({handleClick, isItemSelected, item, labelId}) => {

    const date = new Date(+item.createdAt).toLocaleDateString("en-US")

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
            <TableCell align="left">{item.title}</TableCell>
            <TableCell align="left">{item.to}</TableCell>
            <TableCell align="left">{item.ebayList}</TableCell>
            <TableCell align="left">{item.price}</TableCell>
            <TableCell align="left">{item.createdByUserId?.full_name}</TableCell>
            <TableCell align="left">{date}</TableCell>
        </TableRow>
    );
};

export default InvoicesItem;