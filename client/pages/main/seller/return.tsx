import React from 'react';
import {getCookie} from "cookies-next";
import ListWindow from "../../../components/ListWindow/ListWindow";
import {wrapper} from "../../../store";
import {fetchCurrentUser} from "../../../store/action-creators/user";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import MainLayouts from "../../../layouts/MainLayout";
import {fetchPart} from "../../../store/action-creators/part";
import {TransferList} from "../../../components/TransferList";


const Return = () => {

    const {currentUser} = useTypeSelector(state => state.user)
    const {Parts} = useTypeSelector(state => state.part)
    const token = currentUser.token

    return (
        <MainLayouts active={2}>
            <div className="w-full h-full my-10 mx-auto">
                <TransferList items={Parts} category_left={0.3} category_right={0.4} title_left={"Need to return"}
                              title_right={"Returned"}/> {/*0.3 and 0.4 is value of part status in part_const*/}
            </div>
        </MainLayouts>
    );
};

export default Return;

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

        const {page, count} = store.getState().global.GlobalStateInfo

        await store.dispatch(fetchCurrentUser(token))
        await store.dispatch(fetchPart(token))

        if (store.getState().user.currentUser.type !== "Seller") {
            return {
                redirect: {
                    permanent: false,
                    destination: "/main"
                }
            }
        }
        return {props: {}}
    } catch (e) {
        return {props: {}}
        console.log(e)
    }

});
