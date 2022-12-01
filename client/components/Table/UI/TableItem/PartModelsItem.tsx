import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import {IPartModel} from "../../../../types/partsmodel";

interface IPartModelsItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: IPartModel,
    labelId: string
}

const PartModelsItem: FC<IPartModelsItem> = ({handleClick, isItemSelected, item, labelId}) => {
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={item.name}
            selected={isItemSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                    onClick={(event) => handleClick(event, item._id.toString())}
                />
            </TableCell>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
            >
                {item.searchID} </TableCell>
            <TableCell
                align="right"
            >
                {item.name}
            </TableCell>
            <TableCell align="right">{item.price}</TableCell>
            <TableCell align="right">{item.profit}</TableCell>
            <TableCell align="right">{item.amount_paid}</TableCell>
            <TableCell align="right">{item._laptop_model_id.searchID}</TableCell>
            <TableCell align="right">{item.part_number}</TableCell>
            <TableCell align="right">{item.mpn}</TableCell>
        </TableRow>
    );
};

export default PartModelsItem;