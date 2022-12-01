import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel, TextField, Typography
} from "@mui/material";
import {useInput} from "../../../../../hooks/useInput";
import {IInputProps} from "../Sidebar_ILaptopModel";

interface IMoneyCheckBoxInputsProps {
    value: string,
    changeHandler:  (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void,
    title: string,
    checkBoxSubmitFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    type: string,
    inputProps: IInputProps
}

export const filter_data_array = [
    "<10",
    "10-100",
    ">100",
    "-",
    ""
]

const MoneyCheckBoxInputs: FC<IMoneyCheckBoxInputsProps> = ({value, changeHandler, title, checkBoxSubmitFunction, type, inputProps}) => {

    const [min, setMin] = useState("")
    const [max, setMax] = useState("")

    const [disableIndividual, setDisableIndividual] = useState<boolean>(false)

    const input_props = (inputProps.input_type === type ? {...inputProps} : {})

    useEffect(() => {
        const validated_min = (min === "" ? "0" : min)
        const validated_max = (max === "" ? "0" : max)
        if(!disableIndividual && (validated_min !== "0" && validated_max !== "0") && (+validated_max > +validated_min)){
            //@ts-ignore
            changeHandler({name: type, value: validated_min + "-" + validated_max})
        }
    }, [min, max]);

    return (
        <div>
            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                <FormLabel component="legend">{title}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox onChange={checkBoxSubmitFunction} checked={value === "<10" && disableIndividual} number-data="1"
                                      type-data={type}
                                      filter-data="<10"/>
                        }
                        label="Less than 10$"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox onChange={checkBoxSubmitFunction} checked={value === "10-100" && disableIndividual} number-data="2"
                                      type-data={type}
                                      filter-data="10-100"/>
                        }
                        label="From 10$ to 100$"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox onChange={checkBoxSubmitFunction} checked={value === ">100" && disableIndividual} number-data="3"
                                      type-data={type}
                                      filter-data=">100"/>
                        }
                        label="More than 100$"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox onChange={(e) => {
                                setDisableIndividual(!disableIndividual)
                                //@ts-ignore
                                changeHandler({name: type, value: ""})
                                setMin("")
                                setMax("")
                            }} checked={!disableIndividual} type-data={type}/>
                        }
                        label="Individual"
                    />
                </FormGroup>
                <TextField
                    id="min-input"
                    onChange={(e) => setMin(e.target.value)}
                    value={min}
                    aria-describedby="standard-weight-helper-text"
                    {...input_props}
                    disabled={disableIndividual}
                    className="filter_checkbox_input"
                />
                <FormHelperText id="standard-weight-helper-text">Min</FormHelperText>
                <Typography>-</Typography>
                <TextField
                    id="max-input"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    aria-describedby="standard-weight-helper-text"
                    {...input_props}
                    disabled={disableIndividual}
                    className="filter_checkbox_input error"
                />
                <FormHelperText id="standard-weight-helper-text">Max</FormHelperText>
            </FormControl>
        </div>
    );
};



export default MoneyCheckBoxInputs;