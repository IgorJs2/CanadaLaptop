import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {ILaptopModelListItem} from "../../../../types/laptopmodel";

interface ILaptopModelEditListProps{
    checked: string[],
    setChecked: Dispatch<SetStateAction<string[]>>
}

const LaptopModelEditList: FC<ILaptopModelEditListProps> = ({checked, setChecked}) => {

    const {LaptopModelList} = useTypeSelector(state => state.laptopmodel)


    const handleToggle = (value: ILaptopModelListItem) => () => {
        const currentIndex = checked.indexOf(value._id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value._id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

        return (
            <List className="w-10/12 h-fit max-h-96 overflow-y-scroll mx-auto my-2">

                {LaptopModelList.map((value) => {

                    return (
                        <ListItem
                            key={value._id}
                            disablePadding
                            className="my-4 bg-main-dark-2"
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value._id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={`ID ${value.searchID}`} />
                                <ListItemText secondary={`Name ${value.name}`} className="w-full flex justify-end"/>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        );
};

export default LaptopModelEditList;
