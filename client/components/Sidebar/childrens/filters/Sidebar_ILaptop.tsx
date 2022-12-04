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
import {LaptopCategory, LaptopStatus} from "../../../../constants/laptop_const";
import {useAction} from '../../../../hooks/useAction';
import {Datepicker} from "../../../CalendarComponent/UI/DatePicker";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {IPartFilterData} from "./Sidebar_IPart";
import {fetchFilter} from "../../../../store/action-creators/global";


interface ISidebarILaptopProps {
    // submitHandler: (data: ILaptopFilterData) => void
}

export type ILaptopFilterData = {
    search: string
    searchID: string,
    model: string,
    price: string,
    profit: string,
    amount_paid: string,
    item_status: string,
    title: string,
    category: string,
    description: string,
    tracknumber: string,
    ebaylist: string,
    daysfrompaym: string,
    moneybackdays: string,
    _createdBy: string,
    _createdAt: string,
}

export const initialLaptopFilterData: ILaptopFilterData = {
    search: "",
    searchID: "",
    model: "",
    price: "0",
    profit: "0",
    amount_paid: "0",
    item_status: "0",
    title: "",
    category: "",
    description: "",
    tracknumber: "",
    ebaylist: "",
    daysfrompaym: "0",
    moneybackdays: "0",
    _createdBy: "",
    _createdAt: "",
}

export interface IInputProps {
    error: boolean,
    helperText: string,
    input_type: string
}

const initialFormState: ILaptopFilterData = {
    search: "",
    searchID: "",
    model: "",
    price: "",
    profit: "",
    amount_paid: "",
    item_status: "",
    title: "",
    category: "",
    description: "",
    tracknumber: "",
    daysfrompaym: "0",
    ebaylist: "",
    moneybackdays: "",
    _createdBy: "",
    _createdAt: "",
}

const initialInputProps: IInputProps = {
    error: false,
    helperText: "",
    input_type: "",
}

const SidebarILaptop: FC<ISidebarILaptopProps> = () => {
    const classes = classLister(styles)

    const [form, setForm] = useState<ILaptopFilterData>(initialFormState)
    const [inputProps, setInputProps] = useState<IInputProps>(initialInputProps)
    const [nowTime, setNowTime] = useState<string>("")
    const [date, setDate] = useState<string>("")

    const {fetchFilteredLaptop, fetchFilter} = useAction()
    const {users, currentUser} = useTypeSelector(state => state.user)
    const {GlobalStateInfo} = useTypeSelector(state => state.global)

    const changeHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement> & { name: string, value: string }) => {
        if (e?.target) {
            setForm({...form, [e.target.name]: e.target.value})
            return
        }
        setForm({...form, [e.name]: e.value})
    }

    const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.parentElement instanceof Element) {
            const filter = e.target.parentElement.getAttribute("filter-data")
            const type = e.target.parentElement.getAttribute("type-data")
            if (type && ["profit", "price", "amount_paid", "moneybackdays"].includes(type)) {
                if (filter) {
                    setForm({...form, [type]: filter})
                    return
                }
                setForm({...form, [type]: ""})
            }
        }
    }

    const validateFormHandler = (form: ILaptopFilterData, field: string) => {

        if(field === "_createdAt"){
            const date_regex = new RegExp("^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$")
            if(!date_regex.test(form._createdAt) && form._createdAt !== ""){
                setInputProps({error: true, helperText: "Please enter correct format of date", input_type: "_createdAt"})
                return false;
            }
            setInputProps({error: false, helperText: "", input_type: ""})
            return true
        }

        if (filter_data_array.includes((form as any)[field])) {
            return true;
        }

        const min = (form as any)[field].split("-")[0]
        const max = (form as any)[field].split("-")[1]

        if ((parseInt(min).toString() !== min || parseInt(max)).toString() !== max && (min !== "" || max !== "")) {
            setInputProps({error: true, helperText: "Only number allowed", input_type: field})
            return false;
        }
        setInputProps({error: false, helperText: "", input_type: ""})
        return true
    }

    // useEffect(() => {
    //     console.log(form)
    // }, [form]);

    const submitHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const AmountPaidValidate = validateFormHandler(form, "amount_paid")
        const ProfitValidate = validateFormHandler(form, "profit")
        const PriceValidate = validateFormHandler(form, "price")
        const BackDaysValidate = validateFormHandler(form, "moneybackdays")
        const DateValidate = validateFormHandler(form, "_createdAt")

        if (!AmountPaidValidate || !ProfitValidate || !PriceValidate || !BackDaysValidate || !DateValidate) {
            return;
        }
        fetchFilteredLaptop(form)
    }

    const clearHandler = (event: MouseEvent<HTMLButtonElement>) => {
        fetchFilter(currentUser.token, GlobalStateInfo.count, "laptop", false, {})
        fetchFilteredLaptop({} as ILaptopFilterData)
        setForm({...initialFormState})
    }

    return (
        <>
            <ul className={classes("nav-links")}>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Model"
                            defaultValue=""
                            variant="outlined"
                            value={form.model}
                            onChange={changeHandler}
                            name="model"
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
                                         checkBoxSubmitFunction={checkboxHandler} type={"amount_paid"}
                                         inputProps={inputProps}/>
                </li>
                <li className="my-5">
                    <div>
                        <Typography variant="subtitle1" className="text-left w-full ml-3">Laptop status:</Typography>
                        <Select
                            className="min-w-28"
                            label="Laptop status"
                            name="item_status"
                            value={form.item_status}
                            onChange={changeHandler}
                        >
                            {LaptopStatus.map((e) => {
                                return (
                                    <MenuItem style={{color: e.color}}
                                              value={e.number}>{e.number.toString() + ". " + e.status}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Title"
                            defaultValue=""
                            variant="outlined"
                            value={form.title}
                            onChange={changeHandler}
                            name="title"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <Typography variant="subtitle1" className="text-left w-full ml-3">Category:</Typography>
                        <Select
                            className="min-w-28"
                            label="Category"
                            name="category"
                            defaultValue=""
                            value={form.category}
                            onChange={changeHandler}
                        >
                            {LaptopCategory.map((e) => {
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
                            label="Tracknumber"
                            defaultValue=""
                            variant="outlined"
                            value={form.tracknumber}
                            onChange={changeHandler}
                            name="tracknumber"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Ebay list"
                            defaultValue=""
                            variant="outlined"
                            value={form.ebaylist}
                            onChange={changeHandler}
                            name="ebay_list"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="Days from payment"
                            defaultValue=""
                            variant="outlined"
                            value={form.daysfrompaym}
                            onChange={changeHandler}
                            name="daysfrompaym"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <MoneyCheckBoxInputs value={form.moneybackdays} changeHandler={changeHandler}
                                         title="Money back days:" inputProps={inputProps} id="checkboxs_second"
                                         checkBoxSubmitFunction={checkboxHandler} type={"moneybackdays"}/>
                </li>
                <li className="my-5">
                    <div>
                        <Typography variant="subtitle1" className="text-left w-full ml-3">Created by:</Typography>
                        <Select
                            className="min-w-28"
                            label="Created by"
                            name="_createdBy"
                            value={form._createdBy}
                            onChange={changeHandler}
                        >
                            {users.map((e) => {
                                return (
                                    <MenuItem value={e._id}>{e.full_name}</MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                </li>
                <li>
                    <div>
                        <Typography variant="subtitle1" className="text-left w-full ml-3">Input Date
                            (YYYY-MM-DD):</Typography>
                        <TextField
                            {...inputProps}
                            variant="outlined"
                            type="text"
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                            value={form._createdAt}
                            onChange={changeHandler}
                            name="_createdAt"
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

export default SidebarILaptop;