import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"
import FilterListIcon from "@mui/icons-material/FilterList";
import InfoIcon from '@mui/icons-material/Info';
import * as React from "react";
import {openShortSidebarHandler, openSidebarHandler} from "../../Sidebar/handlers/OpenSidebarHandler";
import {fetchFilterType} from "../../../store/action-creators/global";
import {FC} from "react";
import {useAction} from "../../../hooks/useAction";
import {useTypeSelector} from "../../../hooks/useTypeSelector";


interface ITableToolbarProps {
    numSelected: number;
    filterType: string;
    showDelete: () => void
    showInfo: () => void,
    redirectEditPage: () => void
}

export const TableToolbar: FC<ITableToolbarProps> = ({numSelected, filterType, showDelete, showInfo, redirectEditPage}) => {

    const {fetchFilterType} = useAction()
    const {GlobalStateInfo} = useTypeSelector(state => state.global)

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Table
                </Typography>
            )}
            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon onClick={showDelete}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton>
                            <EditIcon onClick={() => {
                                redirectEditPage()
                            }}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Details">
                        <IconButton>
                            <InfoIcon onClick={showInfo}/>
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton onClick={async (e) => {
                        if (filterType === GlobalStateInfo.filterType) {
                            await openSidebarHandler(e).then((v) => {
                                fetchFilterType(filterType)
                            })
                            return
                        }
                        fetchFilterType(filterType)
                        await openSidebarHandler(e)
                    }}>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};