import React, {FC} from 'react';
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import {ILaptop} from "../../../../types/laptop";
import {TItemStatus} from "../../../../types/subtypes/TItemStatus";
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
import {LaptopStatus} from "../../../../constants/laptop_const";

interface ILaptopsItem {
    handleClick: (event: React.MouseEvent<unknown>, name: string) => void,
    isItemSelected: boolean,
    item: ILaptop,
    labelId: string
}

const LaptopModelsItem: FC<ILaptopsItem> = ({handleClick, isItemSelected, item, labelId}) => {

    const item_status = LaptopStatus.filter((e) => {
        if(item.item_status === e.number){
            return 1
        }
        return 0
    })[0]

    const date = new Date(+item._createdAt).toISOString().split('T')[0]

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
            <TableCell
                align="left"
            >
                {/*@ts-ignore*/}
                <Avatar
                    variant="rounded"
                    src={`${item.img[0]}`}
                    alt={item.title}
                />
            </TableCell>
            <TableCell align="right">{item.model}</TableCell>
            <TableCell align="right">{item.price}</TableCell>
            <TableCell align="right">{item.profit}</TableCell>
            <TableCell align="right">{item.amount_paid}</TableCell>
            <TableCell align="right" style={{color: item_status.color}}>{item_status.number.toString() + ". " + item_status.status}</TableCell>
            <TableCell align="right">{item.title}</TableCell>
            <TableCell align="right">
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={item.category}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {item.category.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={item.category.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </TableCell>
            <TableCell align="right">{item.description.length > 8 ? item.description.slice(0, 8) + "..." : item.description}</TableCell>
            <TableCell align="right">{item.tracknumber}</TableCell>
            <TableCell align="right">{item.ebaylist}</TableCell>
            <TableCell align="right">{item.daysfrompaym}</TableCell>
            <TableCell align="right">{item.moneybackdays}</TableCell>
            <TableCell align="right">{item._createdBy.full_name}</TableCell>
            <TableCell align="right">{date}</TableCell>
        </TableRow>
    );
};

export default LaptopModelsItem;