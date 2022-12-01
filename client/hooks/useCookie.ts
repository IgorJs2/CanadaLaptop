import {getCookie, setCookies} from "cookies-next";


export const useCookie = () => {

    const checkToken = () => {
        if (getCookie("token")) {
            const data = JSON.parse(<string>getCookie("token"))
            return data
        }
    }

    const setCookie = (value: any, key: string) => {
        const day = 1
        const result = new Date().setDate(new Date().getDate() + day);
        const expires = new Date(result)
        const data = JSON.stringify(value)
        const cookie = setCookies(key, data, {path: "/", expires: expires})
    }

    const setCookieForAuth = (token: string) => {
        const day = 1
        const result = new Date().setDate(new Date().getDate() + day);
        const expires = new Date(result)
        const data = JSON.stringify(token)
        const cookie = setCookies("token", data, {path: "/", expires: expires})
    }

    return { setCookie, setCookieForAuth,  checkToken}
}

