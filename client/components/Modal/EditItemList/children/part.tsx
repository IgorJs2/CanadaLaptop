import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {ILaptopModelListItem} from "../../../../types/laptopmodel";
import {ILaptopListItem} from "../../../../types/laptop";
import {IPartListItem} from "../../../../types/parts";

interface IPartEditListProps{
    checked: string[],
    setChecked: Dispatch<SetStateAction<string[]>>
}

const PartEditList: FC<IPartEditListProps> = ({checked, setChecked}) => {

    const {PartList} = useTypeSelector(state => state.part)


    const handleToggle = (value: IPartListItem) => () => {
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

            {PartList.map((value) => {

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

export default PartEditList;
