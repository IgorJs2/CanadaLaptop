import React, {FC} from 'react';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

interface IFAQBlockProps {
    handleClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,
    title: string,
    text: string,
    id: string,
    openedId: string
}

const Index: FC<IFAQBlockProps> = ({handleClick, id , text, openedId, title}) => {
    return (
        <>
            <ListItemButton onClick={handleClick} data-id={id}>
                <ListItemIcon className="pointer-events-none">
                    {title}
                </ListItemIcon>
                <ListItemText primary="" className="pointer-events-none"/>
                {openedId === id ? <ExpandLess className="pointer-events-none"/> : <ExpandMore className="pointer-events-none"/>}
            </ListItemButton>
            <Collapse in={openedId === id} timeout="auto" unmountOnExit className="pointer-events-none">
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    );
};

export default Index;