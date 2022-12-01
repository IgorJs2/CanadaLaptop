import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import {IOrder} from "../../../../types/order";

interface IOrdersItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: IOrder,
    labelId: string
}

const OrdersItem: FC<IOrdersItem> = ({handleClick, isItemSelected, item, labelId}) => {

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
                    checked={isItemSelected}
                    onClick={(event) => handleClick(event, item._id)}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell align="left">{item.laptop_id.searchID}</TableCell>
            <TableCell align="left">{item.part_id.searchID}</TableCell>
            <TableCell align="left">{item.customerName}</TableCell>
            <TableCell align="left">{item.customerShippingAdress}</TableCell>
            <TableCell align="left">{item.tracknumber}</TableCell>
            <TableCell align="left">{item.price}</TableCell>
            <TableCell align="left">{item.createdByUserId.full_name}</TableCell>
            <TableCell align="left">{date}</TableCell>
        </TableRow>
    );
};

export default OrdersItem;