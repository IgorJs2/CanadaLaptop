import React, {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import {useInput} from "../../../../hooks/useInput";
import {DisableFIeldHandler, EnableFieldHandler} from "../../handlers/DisableFIeldHandler";
import {classLister} from "../../../../helpers/classList";
import styles from "../../SideBar.module.css"
import {
    Button,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import MoneyCheckBoxInputs, {filter_data_array} from "./UI/MoneyCheckBoxInputs";
import {LaptopDefects, LaptopStatus} from "../../../../constants/laptop_const";
import {useAction} from '../../../../hooks/useAction';
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {IPartFilterData} from "./Sidebar_IPart";
import {fetchFilter} from "../../../../store/action-creators/global";


interface ISidebarILaptopModelProps {
}

export type ILaptopModelFilterData = {
    search: string;
    searchID: string;
    name: string;
    price: string;
    profit: string;
    amount_paid: string;
    defects: string;
    description: string;
}

export const initialLaptopModelFilterData = {
    search: "",
    searchID: "",
    name: "",
    price: "",
    profit: "",
    amount_paid: "",
    defects: "",
    description: "",
}

export interface IInputProps {
    error: boolean,
    helperText: string,
    input_type: string
}

const initialFormState: ILaptopModelFilterData = {
    search: "",
    searchID: "",
    name: "",
    price: "",
    profit: "",
    amount_paid: "",
    defects: "",
    description: "",
}

const initialInputProps: IInputProps = {
    error: false,
    helperText: "",
    input_type: "",
}

const SidebarILaptopModel: FC<ISidebarILaptopModelProps> = () => {
    const classes = classLister(styles)

    const [form, setForm] = useState<ILaptopModelFilterData>(initialFormState)
    const [inputProps, setInputProps] = useState<IInputProps>(initialInputProps)

    const {fetchFilteredLaptopModels, fetchFilter} = useAction()
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

    const validateFormHandler = (form: ILaptopModelFilterData, field: string) => {

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
        fetchFilteredLaptopModels(form)
    }

    const clearHandler = (event: MouseEvent<HTMLButtonElement>) => {
        fetchFilter(currentUser.token, GlobalStateInfo.count, "laptopmodels", false, {})
        fetchFilteredLaptopModels({} as ILaptopModelFilterData)
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
                        <Typography variant="subtitle1" className="text-left w-full ml-3">Laptop model defects:</Typography>
                        <Select
                            labelId="select_laptop_filter-label"
                            id="select_laptop_filter"
                            className="min-w-28"
                            label="Defects"
                            name="defects"
                            defaultValue=""
                            value={form.defects}
                            onChange={changeHandler}
                        >
                            {LaptopDefects.map((e) => {
                                return (
                                    <MenuItem value={e}>{e}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Description"
                            defaultValue=""
                            variant="outlined"
                            value={form.description}
                            onChange={changeHandler}
                            name="description"
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

export default SidebarILaptopModel;