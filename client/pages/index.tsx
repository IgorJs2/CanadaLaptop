import type {NextPage} from 'next'
import {getCookie} from "cookies-next";
import {wrapper} from "../store";
import AuthComponent from "../components/Auth/Auth";
import {fetchCurrentUser} from "../store/action-creators/user";


const index: NextPage = () => {

    return (
        <>
           <AuthComponent/>
        </>
    )
}

export default index

export const getServerSideProps = wrapper.getServerSideProps((store: any) => async ({req, res}) => {
    try {
        // @ts-ignore
        const token = getCookie("token", {req, res})?.toString() ? JSON.parse(getCookie("token", {req, res}).toString()) : null

        if(token){
            return{
                redirect: {
                    permanent: false,
                    destination: "/main"
                }
            }
        }

        await store.dispatch(fetchCurrentUser(token))

        return {
            props: {}
        }
    } catch (e) {
        return { props: {} }
        console.log(e)
    }

});