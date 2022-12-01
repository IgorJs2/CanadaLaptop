import {IParts} from "../../../types/parts";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import IPartListWindow from "../../ListWindow/childrens/IPartListWindow";
import * as React from "react";
import {handleToggle} from "../handlers/handleToggle";

export const customList = (items: IParts[], handleToggle: (item: IParts) => void, checked: IParts[]) => {

    return (
        <Paper sx={{ width: 800, height: 1000, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((item) => {
                    const labelId = `transfer-list-item-${item._id}-label`;

                    return (
                        <ListItem
                            key={item._id}
                            role="listitem"
                            button
                            onClick={() => handleToggle(item)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(item) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <IPartListWindow item={item} color={"bg-main-dark-2"} horizontal={700} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );
}