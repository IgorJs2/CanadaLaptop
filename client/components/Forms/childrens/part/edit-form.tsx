import React, {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import {IParts} from "../../../../types/parts";
import {classLister} from "../../../../helpers/classList";
import styles from "../../../Sidebar/SideBar.module.css";
import {useAction} from "../../../../hooks/useAction";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import MoneyCheckBoxInputs, {filter_data_array} from "../../../Sidebar/childrens/filters/UI/MoneyCheckBoxInputs";
import {Button, Checkbox, MenuItem, Select, TextField, Typography} from "@mui/material";
import {LaptopCategory, LaptopDefects, LaptopStatus} from "../../../../constants/laptop_const";
import {PartCategory, PartStatus} from "../../../../constants/part_const";

interface IEditFormProps {
    item: IParts;
    submited: boolean
    submitHandler: (form: IPartEditData) => void
    deleteHandler: (e: React.MouseEvent<HTMLElement>) => void,
    cancelSubmitHandler: (e: React.MouseEvent<HTMLElement>) => void,
}

export type IPartEditData = {
    _id: string,
    searchID: string,
    price: string,
    profit: string,
    amount_paid: string,
    item_status: string,
    title: string,
    category: string
    description: string,
    ebaylist: string,
}

export interface IInputProps {
    error: boolean,
    helperText: string,
    input_type: string,
    disable: boolean
}

const initialFormState: IPartEditData = {
    _id: "",
    searchID: "",
    price: "",
    profit: "",
    amount_paid: "",
    item_status: "",
    title: "",
    category: "",
    description: "",
    ebaylist: "",
}

const initialInputProps: IInputProps = {
    error: false,
    helperText: "",
    input_type: "",
    disable: false
}

const PartEditForm: FC<IEditFormProps> = ({item, submited, submitHandler, deleteHandler, cancelSubmitHandler}) => {

    const [form, setForm] = useState<IPartEditData>(initialFormState)
    const [inputProps, setInputProps] = useState<IInputProps>(initialInputProps)

    useEffect(() => {
        setForm({...form, ["_id"]: item._id})
    }, [item._id]);

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
            if (type && ["profit", "price", "amount_paid"].includes(type)) {
                if (filter) {
                    setForm({...form, [type]: filter})
                    return
                }
                setForm({...form, [type]: ""})
            }

        }
    }

    // const validateFormHandler = (form: IPartEditData, field: string) => {
    //
    //     if (filter_data_array.includes((form as any)[field])) {
    //         return true;
    //     }
    //
    //     const min = (form as any)[field].split("-")[0]
    //     const max = (form as any)[field].split("-")[1]
    //
    //     // if ((parseInt(min).toString() !== min || parseInt(max)).toString() !== max && (min !== "" || max !== "")) {
    //     //     setInputProps({error: true, helperText: "Only number allowed", input_type: field})
    //     //     return false;
    //     // }
    //     // setInputProps({error: false, helperText: "", input_type: ""})
    //     // return true
    // }

    // const submitEditHandler = (event: MouseEvent<HTMLButtonElement>) => {
    //     // fetchFilteredLaptopModels(form)
    // }

    const item_status = PartStatus.filter((e) => {
        if(item.item_status === e.number){
            return 1
        }
        return 0
    })[0]

    return (
        <>
            <div
                className={"w-11/12 my-10 mx-auto h-fit bg-main-dark-2 rounded-2xl px-10 py-10" + (submited ? "border-1 border-green border" : "")}>
                <Typography variant="h5"
                            className="w-11/12 mx-auto my-4">{"Item to edit: " + item.title + `[${item.searchID}]`}</Typography>
                <hr className="w-11/12 mx-auto"/>
                <div className="w-11/12 mx-auto h-fit">
                    <div>
                        <div className="my-5">
                            <div className="flex flex-row w-full">
                                <Checkbox checked={(form.title?.length || 0) > 0} disabled={true}/>
                                <TextField
                                    id="standard-helperText"
                                    label="Title"
                                    defaultValue=""
                                    variant="outlined"
                                    value={form.title}
                                    onChange={changeHandler}
                                    name="title"
                                    disabled={submited}
                                />

                                <Typography variant="inherit"
                                            className="w-11/12 ml-10 text-2xs my-4">{"Previous: " + item.title}</Typography>
                            </div>
                        </div>
                        <div className="my-5">
                            <div>
                                <div className="flex flex-row w-full">
                                    <Checkbox checked={(form.price?.length || 0) > 0} disabled={true}/>
                                    <TextField
                                        id="standard-helperText"
                                        label="Price ($)"
                                        defaultValue=""
                                        variant="outlined"
                                        value={form.price}
                                        onChange={changeHandler}
                                        name="price"
                                        disabled={submited}
                                    />
                                    <Typography variant="inherit"
                                                className="w-11/12 ml-10 text-2xs my-4">{"Previous: " + item.price + "$"}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div>
                                <div className="flex flex-row w-full">
                                    <Checkbox checked={(form.profit?.length || 0) > 0} disabled={true}/>
                                    <TextField
                                        id="standard-helperText"
                                        label="Profit ($)"
                                        defaultValue=""
                                        variant="outlined"
                                        value={form.profit}
                                        onChange={changeHandler}
                                        name="profit"
                                        disabled={submited}
                                    />
                                    <Typography variant="inherit"
                                                className="w-11/12 ml-10 text-2xs my-4">{"Previous: " + item.profit + "$"}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div>
                                <div className="flex flex-row w-full">
                                    <Checkbox checked={(form.amount_paid?.length || 0) > 0} disabled={true}/>
                                    <TextField
                                        id="standard-helperText"
                                        label="Amount Paid ($)"
                                        defaultValue=""
                                        variant="outlined"
                                        value={form.amount_paid}
                                        onChange={changeHandler}
                                        name="amount_paid"
                                        disabled={submited}
                                    />
                                    <Typography variant="inherit"
                                                className="w-11/12 ml-10 text-2xs my-4">{"Previous: " + item.amount_paid + "$"}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div>
                                <div className="flex flex-row w-full">
                                    <Checkbox checked={(form.item_status?.length || 0) > 0} disabled={true}/>
                                    <div>
                                        <Typography variant="subtitle1" className="text-left w-full ml-3">Part status:</Typography>
                                        <Select
                                            labelId="select_laptop_filter-label"
                                            id="select_laptop_filter"
                                            className="min-w-28"
                                            label="Item Status"
                                            name="item_status"
                                            defaultValue=""
                                            value={form.item_status}
                                            onChange={changeHandler}
                                            disabled={submited}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {PartStatus.map((e, i) => {
                                                return (
                                                    <MenuItem value={e.number.toString()} style={{color: e.color}}>{e.number.toString() + ". " + e.status}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </div>

                                    <Typography variant="inherit" className="w-11/12 ml-10 mt-10 text-2xs my-4">
                                        {"Previous: "}
                                        <div style={{color: item_status.color}}>{item_status.number.toString() + ". " + item_status.status}</div>
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        <div className="my-5">
                            <div>
                                <div className="flex flex-row w-full">
                                    <Checkbox checked={(form.category?.length || 0) > 0} disabled={true}/>
                                    <div>
                                        <Typography variant="subtitle1" className="text-left w-full ml-3">Part category:</Typography>
                                        <Select
                                            labelId="select_laptop_filter-label"
                                            id="select_laptop_filter"
                                            className="min-w-28"
                                            label="Laptop Category"
                                            name="category"
                                            defaultValue=""
                                            value={form.category}
                                            onChange={changeHandler}
                                            disabled={submited}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {PartCategory.map((e, i) => {
                                                return (
                                                    <MenuItem value={e}>{e}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </div>

                                    <Typography variant="inherit" className="w-11/12 ml-10 mt-10 text-2xs my-4">
                                        {"Previous: "}
                                        {item.category}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div>
                                <div className="flex flex-row w-full">
                                    <Checkbox checked={(form.description?.length || 0) > 0} disabled={true}/>
                                    <TextField
                                        id="standard-helperText"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        maxRows={4}
                                        variant="outlined"
                                        value={form.description}
                                        onChange={changeHandler}
                                        name="description"
                                        disabled={submited}
                                    />
                                    <Typography variant="inherit"
                                                className="w-11/12 ml-10 text-2xs my-4">{"Previous: " + item.description}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div>
                                <div className="flex flex-row w-full">
                                    <Checkbox checked={(form.ebaylist?.length || 0) > 0} disabled={true}/>
                                    <TextField
                                        id="standard-helperText"
                                        label="Ebaylist"
                                        variant="outlined"
                                        value={form.ebaylist}
                                        onChange={changeHandler}
                                        name="ebaylist"
                                        disabled={submited}
                                    />
                                    <Typography variant="inherit"
                                                className="w-11/12 ml-10 text-2xs my-4">{"Previous: " + item.ebaylist}</Typography>
                                </div>
                            </div>
                        </div>
                        <div className="my-5">
                            <div>
                                <Button color="error" variant="outlined" className="mx-2" data-id={item._id}
                                        onClick={deleteHandler}>Delete from edit</Button>
                                <Button color="success" variant="outlined" className="mx-2" data-id={item._id}
                                        onClick={(e) => submitHandler(form)} disabled={submited}>Submit edit</Button>
                                {submited ? (
                                        <Button color="warning" variant="outlined" className="mx-2" data-id={item._id}
                                                onClick={cancelSubmitHandler}>Cancel submit</Button>
                                    ) :
                                    (
                                        <></>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PartEditForm;