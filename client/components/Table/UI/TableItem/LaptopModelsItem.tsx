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
import {ILaptopModel} from "../../../../types/laptopmodel";

interface ILaptopModelsItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: ILaptopModel,
    labelId: string
}

const LaptopModelssItem: FC<ILaptopModelsItem> = ({handleClick, isItemSelected, item, labelId}) => {

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={item.searchID}
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
                padding="none"
            >
                {item.searchID} </TableCell>
            <TableCell align="left">{item.name}</TableCell>
            <TableCell align="left">{item.price}</TableCell>
            <TableCell align="left">{item.profit}</TableCell>
            <TableCell align="left">{item.amount_paid}</TableCell>
            <TableCell align="left">
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={item.defects}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {item.defects.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={item.defects.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="left">{item.description.length > 8 ? item.description.slice(0, 8) + "..." : item.description}</TableCell>
            <TableCell align="left">{item.moneybackdays}</TableCell>
        </TableRow>
    );
};

export default LaptopModelssItem;