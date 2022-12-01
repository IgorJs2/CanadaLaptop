import React, {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import {openSidebarHandler} from "../../handlers/OpenSidebarHandler";
import {useInput} from "../../../../hooks/useInput";
import {DisableFIeldHandler, EnableFieldHandler} from "../../handlers/DisableFIeldHandler";
import {CheckBoxHandlers} from "../../handlers/CheckBoxHandlers";
import {Button, MenuItem, Select, TextField, Typography} from '@mui/material';
import {classLister} from "../../../../helpers/classList";
import styles from "../../SideBar.module.css";
import {useAction} from "../../../../hooks/useAction";
import MoneyCheckBoxInputs, {filter_data_array} from "./UI/MoneyCheckBoxInputs";
import {LaptopDefects} from "../../../../constants/laptop_const";
import {ILaptopModelFilterData} from "./Sidebar_ILaptopModel";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {IPartFilterData} from "./Sidebar_IPart";
import {fetchFilter} from "../../../../store/action-creators/global";


type SidebarIPartModelType = {
}

export type IPartModelFilterData = {
    search: string;
    searchID: string;
    name: string;
    price: string;
    profit: string;
    amount_paid: string;
    part_number: string;
    mpn: string;
}

export const initialPartModelFilterData = {
    search: "",
    searchID: "",
    name: "",
    price: "",
    profit: "",
    amount_paid: "",
    part_number: "",
    mpn: "",
}

export interface IInputProps {
    error: boolean,
    helperText: string,
    input_type: string
}

const initialFormState: IPartModelFilterData = {
    search: "",
    searchID: "",
    name: "",
    price: "",
    profit: "",
    amount_paid: "",
    part_number: "",
    mpn: "",
}

const initialInputProps: IInputProps = {
    error: false,
    helperText: "",
    input_type: "",
}

const SidebarIPartModel: FC<SidebarIPartModelType> = ({}) => {
    const classes = classLister(styles)

    const [form, setForm] = useState<IPartModelFilterData>(initialFormState)
    const [inputProps, setInputProps] = useState<IInputProps>(initialInputProps)

    const {fetchFilteredPartModels, fetchFilter} = useAction()
    const {users, currentUser} = useTypeSelector(state => state.user)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement> & {name: string, value: string}) => {
        if(e?.target){
            setForm({...form, [e.target.name]: e.target.value})
            return
        }
        setForm({...form, [e.name]: e.value})
    }

    const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.parentElement instanceof Element) {
            const filter = e.target.parentElement.getAttribute("filter-data")
            const type = e.target.parentElement.getAttribute("type-data")
            if (type && ["profit","price","amount_paid"].includes(type)) {
                if (filter) {
                    setForm({...form, [type]: filter})
                    return
                }
                setForm({...form, [type]: ""})
            }

        }
    }

    const validateFormHandler = (form: IPartModelFilterData, field: string) => {

        if(filter_data_array.includes((form as any)[field])){
            return true;
        }

        const min = (form as any)[field].split("-")[0]
        const max = (form as any)[field].split("-")[1]

        if((parseInt(min).toString() !== min || parseInt(max)).toString() !== max && (min !== "" || max !== "")){
            setInputProps({error: true, helperText: "Only number allowed", input_type: field})
            return false;
        }
        setInputProps({ error: false, helperText: "", input_type: ""})
        return true
    }

    const submitHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const AmountPaidValidate = validateFormHandler(form, "amount_paid")
        if(!AmountPaidValidate){
            return;
        }
        const ProfitValidate = validateFormHandler(form, "profit")
        if(!ProfitValidate){
            return;
        }
        const PriceValidate = validateFormHandler(form, "price")
        if(!PriceValidate){
            return;
        }
        fetchFilteredPartModels(form)
    }

    const clearHandler = (event: MouseEvent<HTMLButtonElement>) => {
        fetchFilter(currentUser.token, GlobalStateInfo.count, "partmodels", false, {})
        fetchFilteredPartModels({} as IPartModelFilterData)
        setForm({...initialFormState})
    }

    return (
        <>
            <ul className={classes("nav-links")}>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Item ID"
                            defaultValue=""
                            variant="outlined"
                            value={form.searchID}
                            onChange={changeHandler}
                            name="searchID"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Model"
                            defaultValue=""
                            variant="outlined"
                            value={form.name}
                            onChange={changeHandler}
                            name="name"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <MoneyCheckBoxInputs value={form.price} changeHandler={changeHandler}
                                         title="Price:" inputProps={inputProps} id="checkboxs_second"
                                         checkBoxSubmitFunction={checkboxHandler} type={"price"}/>
                </li>
                <li className="my-5">
                    <MoneyCheckBoxInputs value={form.profit} changeHandler={changeHandler}
                                         title="Profit:" inputProps={inputProps} id="checkboxs_second"
                                         checkBoxSubmitFunction={checkboxHandler} type={"profit"}/>
                </li>
                <li className="my-5">
                    <MoneyCheckBoxInputs value={form.amount_paid} changeHandler={changeHandler}
                                         title="AmountPaid:" id={"checkboxs_first"}
                                         checkBoxSubmitFunction={checkboxHandler} type={"amount_paid"} inputProps={inputProps}/>
                </li>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Part number"
                            defaultValue=""
                            variant="outlined"
                            value={form.part_number}
                            onChange={changeHandler}
                            name="part_number"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="MPN"
                            defaultValue=""
                            variant="outlined"
                            value={form.mpn}
                            onChange={changeHandler}
                            name="mpn"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <Button color="error" variant="outlined" className="mx-2" onClick={clearHandler}>Clear</Button>
                        <Button color="success" variant="outlined" className="mx-2"
                                onClick={submitHandler}>Submit</Button>
                    </div>
                </li>
            </ul>

        </>
    );

};

export default SidebarIPartModel;