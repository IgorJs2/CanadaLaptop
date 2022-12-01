import * as React from 'react';
import {FC, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {TableData} from "./types";
import {TableToolbar} from "./UI/TableToolbar";
import {TableHeader} from "./UI/TableHead";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useAction} from "../../hooks/useAction";
import {
    InvoicesCells,
    LaptopModelsCells,
    LaptopsCells,
    MailsCells,
    numberPerPage,
    OrdersCells,
    PartModelsCells,
    PartsCells,
    PermissionsCells,
    RolesCells,
    UsersCells
} from "./const";
import TableItems from "./UI/TableItems";
import {item_types} from "../../constants/global_const";
import DeleteItemModal from "../Modal/TableModals/DeleteItemModal";
import InfoItemModal from "../Modal/TableModals/InfoItemModal/InfoItemModal";
import {useRouter} from "next/router";
import {convertArrayToUrlParams} from "../../helpers/convertToUrlParams";
import {fetchLaptopModelsFromIdArray} from "../../store/action-creators/laptopmodels";
import {useCookie} from "../../hooks/useCookie";

interface ICustomTableProps {
    item_type: item_types,
}

const CustomTable: FC<ICustomTableProps> = ({item_type}) => {

    const router = useRouter()
    const {setCookie} = useCookie()


    const {GlobalStateInfo} = useTypeSelector(state => state.global)
    const {maxpage, page, count, sort_field, sort_value} = GlobalStateInfo

    //*Add new table types here

    const {PartModels} = useTypeSelector(state => state.partmodel)
    const {Parts} = useTypeSelector(state => state.part)
    const {Laptops} = useTypeSelector(state => state.laptop)
    const {Mails} = useTypeSelector(state => state.mail)
    const {LaptopModels} = useTypeSelector(state => state.laptopmodel)
    const {users} = useTypeSelector(state => state.user)
    const {Permissions} = useTypeSelector(state => state.permission)
    const {Roles} = useTypeSelector(state => state.role)
    const {Invoices} = useTypeSelector(state => state.invoice)
    const {Orders} = useTypeSelector(state => state.order)

    const isPartModels = item_type === item_types.PartModel ? true : false
    const isPart = item_type === item_types.Part ? true : false
    const isLaptops = item_type === item_types.Laptop ? true : false
    const isMails = item_type === item_types.Mail ? true : false
    const isLaptopModels = item_type === item_types.LaptopModel ? true : false
    const isUsers = item_type === item_types.User ? true : false
    const isPermissions = item_type === item_types.Permission ? true : false
    const isRoles = item_type === item_types.Role ? true : false
    const isInvoices = item_type === item_types.Invoice ? true : false
    const isOrders = item_type === item_types.Order ? true : false

    const TableItemsArray =
        (isPartModels ? [...PartModels] : false) ||
        (isPart ? [...Parts] : false) ||
        (isLaptops ? [...Laptops] : false) ||
        (isMails ? [...Mails] : false) ||
        (isLaptopModels ? [...LaptopModels] : false) ||
        (isUsers ? [...users] : false) ||
        (isPermissions ? [...Permissions] : false) ||
        (isRoles ? [...Roles] : false) ||
        (isInvoices ? [...Invoices] : false) ||
        (isOrders ? [...Orders] : false)

    const Cells =
        (isPartModels ? PartModelsCells : false) ||
        (isPart ? PartsCells : false) ||
        (isLaptops ? LaptopsCells : false) ||
        (isMails ? MailsCells : false) ||
        (isLaptopModels ? LaptopModelsCells : false) ||
        (isUsers ? UsersCells : false) ||
        (isPermissions ? PermissionsCells : false) ||
        (isRoles ? RolesCells : false) ||
        (isInvoices ? InvoicesCells : false)||
        (isOrders ?  OrdersCells: false)

    const FilterType =
        (isPartModels ? "PartModelFilter" : false) ||
        (isPart ? "PartFilter" : false) ||
        (isLaptops ? "LaptopFilter" : false) ||
        (isMails ? "MailFilter" : false) ||
        (isLaptopModels ? "LaptopModelFilter" : false) ||
        (isUsers ? "UserFilter" : false) ||
        (isPermissions ? "PermissionFilter" : false) ||
        (isRoles ? "RoleFilter" : false) ||
        (isInvoices ? "InvoiceFilter" : false)||
        (isOrders ?  "OrderFilter": false)

    //*

    const {fetchPage, fetchSortField, fetchSortValue, fetchCount} = useAction()

    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [dense, setDense] = React.useState(false);

    const [delete_visible, setDeleteVisible] = useState<boolean>(false)
    const [edit_visible, setEditVisible] = useState<boolean>(false)

    if(!Cells || !TableItemsArray || !FilterType){
        return (<></>)
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof TableData,
    ) => {
        const isAsc = sort_field === property && sort_value === 'asc';
        fetchSortValue(isAsc ? 'desc' : 'asc');
        fetchSortField(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = TableItemsArray.map((n) => n._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        fetchPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        fetchCount(event.target.value);
        fetchPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const redirectEditPageHandler = () => {
        setCookie([...selected], "id_array_to_edit")
        const item_type = FilterType.split("Filter")[0].toLowerCase()
        router.push("/main/object/edit/" + item_type)
    }

    return (
        <div className="w-full h-fit">
            <Paper sx={{width: '100%', mb: 2}}>
                <DeleteItemModal visible={delete_visible} onClick={() => setDeleteVisible(false)}  names={selected}/>
                {/*@ts-ignore*/}
                <InfoItemModal visible={edit_visible} onClick={() => setEditVisible(false)} items={TableItemsArray.map((e) => selected.includes(e._id) ? e : undefined).filter((e) => e ? e : false)}/>
                <TableToolbar numSelected={selected.length} filterType={FilterType}
                              showDelete={() => setDeleteVisible(true)}
                              showInfo={() => setEditVisible(true)}
                              redirectEditPage={redirectEditPageHandler}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <TableHeader
                            numSelected={selected.length}
                            order={sort_value}
                            orderBy={sort_field}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={TableItemsArray.length}
                            headCells={Cells}/>
                        <TableBody>
                            {/*Add new table types here*/}
                            <TableItems isPartModels={isPartModels} isParts={isPart} isLaptop={isLaptops} isMail={isMails} isLaptopModels={isLaptopModels} isPermission={isPermissions}
                                        isRole={isRoles} isUser={isUsers} isInvoice={isInvoices} isOrder={isOrders} selected={selected} setSelected={setSelected} dense={dense}/>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={numberPerPage}
                    component="div"
                    count={maxpage}
                    rowsPerPage={count}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </div>
    );
}


export default CustomTable

