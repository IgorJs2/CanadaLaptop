import React, {Dispatch, FC, SetStateAction} from 'react';
import {getComparator, stableSort} from "../functions";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import PartModelsItem from "./TableItem/PartModelsItem";
import PartsItem from "./TableItem/PartsItem";
import MailItem from "./TableItem/MailItem";
import UsersItem from "./TableItem/UsersList";
import PermissionsItem from "./TableItem/PermissionsItem";
import RolesItem from "./TableItem/RolesItem";
import LaptopModelsItem from "./TableItem/LaptopModelsItem";
import InvoiceItem from "./TableItem/InvoiceItem";
import OrdersItem from "./TableItem/OrderItem";
import LaptopsItem from "./TableItem/LaptopsItem";

interface TableItemsProps {
    isPartModels?: boolean,isParts?: boolean,isLaptop?: boolean,isLaptopModels?: boolean,isMail?: boolean,isPermission?: boolean,isRole?: boolean,isUser?: boolean,isInvoice?: boolean,isOrder?: boolean,
    dense: boolean
    selected: readonly string[];
    setSelected: Dispatch<SetStateAction<readonly string[]>>
}

const TableItems: FC<TableItemsProps> = ({isParts, isPartModels, isLaptopModels, isLaptop, isMail,
                                            isUser, isPermission, isRole, isInvoice, isOrder,
                                             setSelected, selected, dense}) => {

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

    const TableItemsArray =
        (isPartModels ? [...PartModels] : false) ||
        (isParts ? [...Parts] : false) ||
        (isLaptop ? [...Laptops] : false) ||
        (isMail ? [...Mails] : false) ||
        (isLaptopModels ? [...LaptopModels] : false) ||
        (isUser ? [...users] : false) ||
        (isPermission ? [...Permissions] : false) ||
        (isRole ? [...Roles] : false) ||
        (isInvoice ? [...Invoices] : false) ||
        (isOrder ? [...Orders] : false)
    //*

    if(!TableItemsArray) {
        return <></>
    }

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    return (
        <>
            {
                //@ts-ignore
                stableSort(TableItemsArray, getComparator(sort_value, sort_field))
                    // .slice(page * count, page * count + count)
                    .map((row, index) => {
                        const isItemSelected = isSelected(row?._id?.toString());
                        const labelId = `enhanced-table-checkbox-${index}`;

                        if (isPartModels) {
                            //@ts-ignore
                            return <PartModelsItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id}/>
                        }

                        if(isParts){
                            //@ts-ignore
                            return <PartsItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id}/>
                        }

                        if(isLaptop){
                            //@ts-ignore
                            return <LaptopsItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id}/>
                        }

                        if(isMail){
                            //@ts-ignore
                            return <MailItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id}/>
                        }

                        if(isUser){
                            //@ts-ignore
                            return <UsersItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id} />
                        }

                        if(isPermission){
                            //@ts-ignore
                            return <PermissionsItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id}/>
                        }

                        if(isRole){
                            //@ts-ignore
                            return <RolesItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id} />
                        }

                        if(isLaptopModels) {
                            //@ts-ignore
                            return <LaptopModelsItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id} />
                        }

                        if(isInvoice) {
                            //@ts-ignore
                            return <InvoiceItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id} />
                        }

                        if(isOrder) {
                            //@ts-ignore
                            return <OrdersItem handleClick={handleClick} isItemSelected={isItemSelected} item={row} labelId={labelId} key={row._id} />
                        }

                    })
            }
        </>
    );
};

export default TableItems;