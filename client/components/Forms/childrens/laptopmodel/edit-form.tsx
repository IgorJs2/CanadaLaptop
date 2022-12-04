import React, {ChangeEvent, FC, MouseEvent, useEffect, useState} from 'react';
import {ILaptopModel} from "../../../../types/laptopmodel";
import {classLister} from "../../../../helpers/classList";
import styles from "../../../Sidebar/SideBar.module.css";
import {useAction} from "../../../../hooks/useAction";
import {useTypeSelector} from "../../../../hooks/useTypeSelector";
import MoneyCheckBoxInputs, {filter_data_array} from "../../../Sidebar/childrens/filters/UI/MoneyCheckBoxInputs";
import {Button, Checkbox, MenuItem, Select, TextField, Typography} from "@mui/material";
import {LaptopDefects} from "../../../../constants/laptop_const";

interface IEditFormProps {
    item: ILaptopModel;
    submited: boolean
    submitHandler: (form: ILaptopModelEditData) => void
    deleteHandler: (e: React.MouseEvent<HTMLElement>) => void,
    cancelSubmitHandler: (e: React.MouseEvent<HTMLElement>) => void,
}

export type ILaptopModelEditData = {
    _id: string;
    name?: string;
    price?: string;
    profit?: string;
    amount_paid?: string;
    defects?: string;
    description?: string;
}

export interface IInputProps {
    error: boolean,
    helperText: string,
    input_type: string,
    disable: boolean
}

const initialFormState: ILaptopModelEditData = {
    _id: "",
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
    disable: false
}

const LaptopModelEditForm: FC<IEditFormProps> = ({item, submited, submitHandler, deleteHandler, cancelSubmitHandler}) => {

    const [form, setForm] = useState<ILaptopModelEditData>(initialFormState)
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

    // const validateFormHandler = (form: ILaptopModelEditData, field: string) => {
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

    return (
        <>
            <div
                className={"w-11/12 my-10 mx-auto h-fit bg-main-dark-2 rounded-2xl px-10 py-10" + (submited ? "border-1 border-green border" : "")}>
                <Typography variant="h5"
                            className="w-11/12 mx-auto my-4">{"Item to edit: " + item.name + `[${item.searchID}]`}</Typography>
                <hr className="w-11/12 mx-auto"/>
                <div className="w-11/12 mx-auto h-fit">
                    <div>
                        <div className="my-5">
                            <div className="flex flex-row w-full">
                                <Checkbox checked={(form.name?.length || 0) > 0} disabled={true}/>
                                <TextField
                                    id="standard-helperText"
                                    label="Name"
                                    defaultValue=""
                                    variant="outlined"
                                    value={form.name}
                                    onChange={changeHandler}
                                    name="name"
                                    disabled={submited}
                                />

                                <Typography variant="inherit"
                                            className="w-11/12 ml-10 text-2xs my-4">{"Previous: " + item.name}</Typography>
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
                                    <Checkbox checked={(form.defects?.length || 0) > 0} disabled={true}/>
                                    <div>
                                        <Typography variant="subtitle1" className="text-left w-full ml-3">Laptop model
                                            defects:</Typography>
                                        <Select
                                            labelId="select_laptop_filter-label"
                                            id="select_laptop_filter"
                                            className="min-w-28"
                                            label="Defects"
                                            name="defects"
                                            defaultValue=""
                                            value={form.defects}
                                            onChange={changeHandler}
                                            disabled={submited}
                                        >
                                            <MenuItem value=""><em>None</em></MenuItem>
                                            {LaptopDefects.map((e, i) => {
                                                return (
                                                    <MenuItem value={e}>{e}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </div>

                                    <Typography variant="inherit" className="w-11/12 ml-10 mt-10 text-2xs my-4">
                                        {"Previous: "}
                                        {item.defects.map((defect, i) => <>{i === item.defects.length - 1 ? defect : defect + ", "} </>)}
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

export default LaptopModelEditForm;