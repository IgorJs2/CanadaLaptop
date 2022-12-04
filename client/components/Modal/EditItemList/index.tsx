import React, {Dispatch, FC, SetStateAction, useCallback, useState} from 'react';
import {Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import LaptopModelEditList from "./children/laptopmodel";
import {ILaptopModel, ILaptopModelListItem} from "../../../types/laptopmodel";
import {useInput} from "../../../hooks/useInput";
import {useDebounce} from "../../../hooks/useDebounce";
import {useAction} from "../../../hooks/useAction";
import {initialLaptopModelFilterData} from "../../Sidebar/childrens/filters/Sidebar_ILaptopModel";
import {useRouter} from "next/router";
import {fetchLaptopModelsFromIdArray} from "../../../store/action-creators/laptopmodels";
import {item_types} from "../../../constants/global_const";
import {fetchLaptopList} from "../../../store/action-creators/laptop";
import {initialLaptopFilterData} from "../../Sidebar/childrens/filters/Sidebar_ILaptop";
import {fetchPartList, fetchPartsFromIdArray} from "../../../store/action-creators/part";
import {initialPartFilterData} from "../../Sidebar/childrens/filters/Sidebar_IPart";
import {initialPartModelFilterData} from "../../Sidebar/childrens/filters/Sidebar_IPartModel";
import {fetchPartModelList, fetchPartModelsFromIdArray} from "../../../store/action-creators/partmodels";
import LaptopEditList from "./children/laptop";
import PartEditList from "./children/part";
import PartModelEditList from "./children/partmodel";

interface IEditListModalProps {
    visible: boolean,
    onClick: () => void,
    type: string,
    checked: string[],
    setChecked: Dispatch<SetStateAction<string[]>>
}

const EditListModal: FC<IEditListModalProps> = ({visible, onClick, type, checked, setChecked}) => {

    if (!visible) {
        return (<></>)
    }

    const [search, setSearch] = useState<string>("")
    const {
        fetchLaptopModelList, fetchLaptopList, fetchPartModelsFromIdArray, fetchLaptopModelsFromIdArray
        ,fetchPartModelList, fetchPartsFromIdArray,fetchPartList, fetchLaptopsFromIdArray
    } = useAction()

    const changeHandler = useCallback((e) => {
        setSearch(e.target.value)
        searchFilteredList(e.target.value)
    }, [])

    const searchFilteredList = useDebounce((e: string) => {
        switch (type) {
            case item_types.LaptopModel:
                fetchLaptopModelList({...initialLaptopModelFilterData, search: e})
                break;
            case item_types.Laptop:
                fetchLaptopList({...initialLaptopFilterData, search: e})
                break;
            case item_types.Part:
                fetchPartList({...initialPartFilterData, search: e})
                break;
            case item_types.PartModel:
                fetchPartModelList({...initialPartModelFilterData, search: e})
                break;
        }
    }, 500)

    const submitHandler = () => {
        switch (type) {
            case item_types.LaptopModel:
                fetchLaptopModelsFromIdArray([...checked], "")
                break;
            case item_types.Laptop:
                fetchLaptopsFromIdArray([...checked], "")
                break;
            case item_types.Part:
                fetchPartsFromIdArray([...checked], "")
                break;
            case item_types.PartModel:
                fetchPartModelsFromIdArray([...checked], "")
                break;
        }
        onClick()
    }
    
    return (
        <Modal
            open={visible}
            onClose={onClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="w-full hfull flex justify-center items-center text-center"
        >
            <div className="w-4/12 min-h-96 h-fit bg-main-dark rounded-2xl">
                <Typography id="modal-modal-title" variant="h6" component="h2"
                            className="my-4 text-left w-11/12 mx-auto">
                    Choose items from list
                </Typography>
                <hr className="w-11/12 mx-auto"/>
                <div className="w-4/12 pt-8 flex justify-end">
                    <TextField value={search} onChange={changeHandler} type="text" placeholder="Search"
                               className="mx-2 bg-main-dark-2 border-none"/>
                </div>
                {type === item_types.LaptopModel ? <LaptopModelEditList checked={checked} setChecked={setChecked}/> : <></>}
                {type === item_types.Laptop ? <LaptopEditList checked={checked} setChecked={setChecked}/> : <></>}
                {type === item_types.Part ? <PartEditList checked={checked} setChecked={setChecked}/> : <></>}
                {type === item_types.PartModel ? <PartModelEditList checked={checked} setChecked={setChecked}/> : <></>}

                <div className="w-full flex flex-row justify-end h-12 my-10">
                    <Button color="error" variant="outlined" className="w-2/12 mx-2" onClick={onClick}>Cancel</Button>
                    <Button color="success" variant="outlined" className="w-2/12 mx-2"
                            onClick={submitHandler}>Submit</Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditListModal;