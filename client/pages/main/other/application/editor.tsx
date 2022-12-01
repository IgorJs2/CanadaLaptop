import React, {Component, Suspense} from 'react';
import MainLayouts from "../../../../layouts/MainLayout";
import FroalaEditor from 'react-froala-wysiwyg';
import {wrapper} from "../../../../store";
import {getCookie} from "cookies-next";
import {fetchCurrentUser} from "../../../../store/action-creators/user";
import dynamic from "next/dynamic";


const DynamicEditor = dynamic(() => import("../../../../components/Editor/index"), {
    ssr: false
});

const Editor = () => {



    return (
        <>
            <MainLayouts active={1}>
                <div className="w-full h-full my-10 mx-auto flex flex-row ml-36 mt-48">
                    <div className="w-11/12 bg-main-dark min-h-48 rounded-2xl mr-5 p-4 h-fit">
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
