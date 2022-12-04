import React, {useEffect, useState} from 'react';
import {wrapper} from "../../../../../store";
import {getCookie, removeCookies} from "cookies-next";
import {fetchCurrentUser} from "../../../../../store/action-creators/user";
import MainLayouts from "../../../../../layouts/MainLayout";
import {Button, Typography} from "@mui/material";
import {useTypeSelector} from "../../../../../hooks/useTypeSelector";
import PartModelEditForm, {IPartModelEditData} from "../../../../../components/Forms/childrens/partmodel/edit-form"
import EditListModal from "../../../../../components/Modal/EditItemList";
import {IPartModelFilterData} from "../../../../../components/Sidebar/childrens/filters/Sidebar_IPartModel";
import {useAction} from "../../../../../hooks/useAction";
import {useRouter} from "next/router";
import AcceptCancelModal from "../../../../../components/Modal/DialogModal/accept_cancel_Modal";
import {fetchPartModelList, fetchPartModelsFromIdArray} from "../../../../../store/action-creators/partmodels";
import {item_types} from "../../../../../constants/global_const";

const Index = () => {

    const router = useRouter();

    const {PartModels} = useTypeSelector(state => state.partmodel)
    const {fetchPartModelsFromIdArray, fetchPartModelEditFromList} = useAction()

    const [visibleAcceptCancel, setVisibleAcceptCancel] = useState<boolean>(false)
    const [visibleEditList, setVisibleEditList] = useState<boolean>(false)

    const [checked, setChecked] = useState<string[]>(PartModels.map((e) => e._id));
    const [submited, setSubmited] = useState<string[]>([])
    const [submitedData, setSubmitedData] = useState<IPartModelEditData[]>([])

    const submitHandler = (form: IPartModelEditData) => {
        if (form && form._id) {
            setSubmited([...submited, form._id])
            setSubmitedData([...submitedData, form])
        }
    }

    const cancelSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
        const id = e.currentTarget.getAttribute("data-id")
        if (id) {
            setSubmited([...submited.filter((i) => i !== id)])
            setSubmitedData([...submitedData.filter((i) => i._id !== id)])
        }
    }

    const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
        const id = e.currentTarget.getAttribute("data-id")
        if (id) {
            const array_with_removed_id = [...PartModels].map((item) => item._id).filter((i) => i !== id)
            setChecked([...checked.filter((i) => i !== id)])
            setSubmited([...submited.filter((i) => i !== id)])
            setSubmitedData([...submitedData.filter((i) => i._id !== id)])
            fetchPartModelsFromIdArray(array_with_removed_id, "")
        }
    }

    const submitEditHandler = (isAllSubmitted: boolean) => {
        if(!isAllSubmitted){
            setVisibleAcceptCancel(true)
            return
        }
        //TODO: Make here alert if you try to submit edit when you not have submitted items
        fetchPartModelEditFromList(submitedData)
    }

    return (
        <MainLayouts active={1}>
            <AcceptCancelModal  callback={() => submitEditHandler(true)} change_text={"submit editing when your not have all items submitted?"} onClick={() => setVisibleAcceptCancel(false)} visible={visibleAcceptCancel}/>
            <EditListModal visible={visibleEditList} onClick={() => setVisibleEditList(false)} type={item_types.PartModel} checked={checked}
                           setChecked={setChecked}/>
            <div className="centralized_block ">
                <div className="w-11/12 bg-main-dark h-fit min-h-48 rounded-box mr-5 rounded-2xl ">
                    <Typography variant="h5" gutterBottom component="h2" className="w-11/12 mx-auto my-4">
                        Edit PartModel
                    </Typography>
                    <hr className="w-11/12 mx-auto"/>

                    <div className="w-11/12 mx-auto my-4 flex justify-end">
                        <Button variant="outlined" color="info" onClick={() => setVisibleEditList(!visibleEditList)}>Add item to
                            edit</Button>
                    </div>

                    {PartModels.map((item) => {
                        const isSubmited = submited.indexOf(item._id) > -1

                        return (
                            <PartModelEditForm key={item._id} item={item} submited={isSubmited}
                                                 submitHandler={submitHandler} deleteHandler={deleteHandler}
                                                 cancelSubmitHandler={cancelSubmitHandler}/>
                        )
                    })}

                    {
                        PartModels && PartModels[0] ? (
                            <div className="my-5 mx-5 flex justify-end">
                                <Button color="error" variant="outlined" className="mx-2" onClick={() => router.back()}>Return back</Button>
                                <Button color="success" variant="outlined" className="mx-2" onClick={() => submitEditHandler(submitedData.length === PartModels.length)}>Send edit items</Button>
                            </div>
                        ) : <></>
                    }
                </div>
            </div>
        </MainLayouts>
    );
};

export default Index;


export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res}) => {
    try {
        // @ts-ignore
        const token = getCookie("token", {req, res}) ? JSON.parse(getCookie("token", {req, res})?.toString()) : null

        if (!token) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/"
                }
            }
        }
        // @ts-ignore
        const id_array = getCookie("id_array_to_edit", {req, res}) ? JSON.parse(getCookie("id_array_to_edit", {
            req,
            res
        })?.toString()) : null

        if (id_array) {
            await store.dispatch(fetchPartModelsFromIdArray(id_array, token))
            removeCookies("id_array_to_edit", {req, res})
        }


        await store.dispatch(fetchCurrentUser(token))
        await store.dispatch(fetchPartModelList({} as IPartModelFilterData, token))

        return {props: {}}
    } catch (e) {
        return {props: {}}
        console.log(e)
    }

});