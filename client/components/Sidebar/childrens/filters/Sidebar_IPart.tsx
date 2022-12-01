import React, {ChangeEvent, FC, MouseEvent, useState} from 'react';
import {Button, MenuItem, Select, TextField, Typography} from '@mui/material';
import {classLister} from "../../../../helpers/classList";
import styles from "../../SideBar.module.css";
import {useAction} from "../../../../hooks/useAction";
import MoneyCheckBoxInputs, {filter_data_array} from "./UI/MoneyCheckBoxInputs";
import {PartCategory, PartStatus} from "../../../../constants/part_const";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import {fetchFilter, fetchMaxPage} from "../../../../store/action-creators/global";


type SidebarIPartModelType = {
}

export type IPartFilterData = {
    search: string;
    searchID: string,
    _laptopSearchID: string,
    price: string,
    profit: string,
    amount_paid: string,
    item_status: string,
    title: string,
    category: string
    ebaylist: string,
    _createdBy: string,
    _createdAt: string;
}

export const initialPartFilterData = {
    search: "",
    searchID: "",
    _laptopSearchID: "",
    price: "",
    profit: "",
    amount_paid: "",
    item_status: "",
    title: "",
    category: "",
    ebaylist: "",
    _createdBy: "",
    _createdAt: ""
}

export interface IInputProps {
    error: boolean,
    helperText: string,
    input_type: string
}

const initialFormState: IPartFilterData = {
    search: "",
    searchID: "",
    _laptopSearchID: "",
    price: "",
    profit: "",
    amount_paid: "",
    item_status: "",
    title: "",
    category: "",
    ebaylist: "",
    _createdBy: "",
    _createdAt: ""
}

const initialInputProps: IInputProps = {
    error: false,
    helperText: "",
    input_type: "",
}

const SidebarIPartModel: FC<SidebarIPartModelType> = ({}) => {
    const classes = classLister(styles)

    const [form, setForm] = useState<IPartFilterData>(initialFormState)
    const [inputProps, setInputProps] = useState<IInputProps>(initialInputProps)

    const {fetchFilteredPart, fetchMaxPage, fetchFilter} = useAction()
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

    const validateFormHandler = (form: IPartFilterData, field: string) => {

        if(field === "_createdAt"){
            const date_regex = new RegExp("^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$")
            if(!date_regex.test(form._createdAt) && form._createdAt !== ""){
                setInputProps({error: true, helperText: "Please enter correct format of date", input_type: "_createdAt"})
                return false;
            }
            setInputProps({error: false, helperText: "", input_type: ""})
            return true
        }

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
        const PriceValidate = validateFormHandler(form, "price")
        if(!PriceValidate){
            return;
        }
        fetchFilter(currentUser.token, GlobalStateInfo.count, "parts", true, form)
        fetchFilteredPart(form)
    }

    const clearHandler = (event: MouseEvent<HTMLButtonElement>) => {
        fetchFilter(currentUser.token, GlobalStateInfo.count, "parts", false, {})
        fetchFilteredPart({} as IPartFilterData)
        setForm({...initialFormState})
    }

    return (
        <>
            <ul className={classes("nav-links")}>
                <li className="my-5">
                    <div>
                        <TextField
                            id="standard-helperText"
                            label="ID"
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
                            label="Laptop ID"
                            defaultValue=""
                            variant="outlined"
                            value={form._laptopSearchID}
                            onChange={changeHandler}
                            name="_laptopSearchID"
                        />
                    </div>
                </li>
                <li className="my-5">
                    <MoneyCheckBoxInputs value={form.price} changeHandler={changeHandler}
                                         title="Price:" id={"checkboxs_first"}
                                         checkBoxSubmitFunction={checkboxHandler} type={"price"} inputProps={inputProps}/>
                </li>
                <li className="my-5">
                    <MoneyCheckBoxInputs value={form.profit} changeHandler={changeHandler}
                                         title="Profit:" id={"checkboxs_first"}
                                         checkBoxSubmitFunction={checkboxHandler} type={"profit"} inputProps={inputProps}/>
                </li>
                <li className="my-5">
                    <MoneyCheckBoxInputs value={form.amount_paid} changeHandler={changeHandler}
                                         title="Amount Paid:" id={"checkboxs_first"}
                                         checkBoxSubmitFunction={checkboxHandler} type={"amount_paid"} inputProps={inputProps}/>
                </li>
                <li className="my-5">
                    <div>
                        <Typography variant="subtitle1" className="text-left w-full ml-3">Part status:</Typography>
                        <Select
                            className="min-w-28"
                            label="Laptop status"
                            name="item_status"
                            value={form.item_status}
                            onChange={changeHandler}
                        >
                            {PartStatus.map((e) => {
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
                        <Typography variant="subtitle1" className="text-left w-full ml-3">Part category:</Typography>
                        <Select
                            className="min-w-28"
                            label="Part category"
                            name="category"
                            value={form.category}
                            onChange={changeHandler}
                        >
                            {PartCategory.map((e) => {
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
                            label="Ebay List"
                            defaultValue=""
                            variant="outlined"
                            value={form.ebaylist}
                            onChange={changeHandler}
                            name="ebayList"
                        />
                    </div>
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

export default SidebarIPartModel;