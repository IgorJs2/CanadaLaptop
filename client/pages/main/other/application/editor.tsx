import React, {Component, Suspense} from 'react';
import MainLayouts from "../../../../layouts/MainLayout";
import FroalaEditor from 'react-froala-wysiwyg';
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../store/action-creators/user";
import dynamic from "next/dynamic";
import AcceptCancelModal from "../../../../components/Modal/DialogModal/accept_cancel_Modal";
import EditListModal from "../../../../components/Modal/EditItemList";
import {item_types} from "../../../../constants/global_const";
import {Button, Typography} from "@mui/material";
import LaptopModelEditForm from "../../../../components/Forms/childrens/laptopmodel/edit-form";


const DynamicEditor = dynamic(() => import("../../../../components/Editor/index"), {
    ssr: false
});

const Editor = () => {



    return (
        <>
            <MainLayouts active={1}>
                <div className="centralized_block ">
                    <div className="w-11/12 bg-main-dark h-fit min-h-48 rounded-box mr-5 rounded-2xl ">
                        <Typography variant="h5" gutterBottom component="h2" className="w-11/12 mx-auto my-4">
                            Editor
                        </Typography>
                        <hr className="w-11/12 mx-auto mb-10"/>
                        <Suspense fallback={`Loading...`}>
                            <DynamicEditor />
                        </Suspense>
                    </div>
                </div>
            </MainLayouts>
        </>
    );

}

export default Editor;

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

        await store.dispatch(fetchCurrentUser(token))

        return {props: {}}
    } catch (e) {
        return {props: {}}
        console.log(e)
    }

});
