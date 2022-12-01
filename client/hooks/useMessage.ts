import { useCallback } from 'react'

export const useMessage = () => {
    return useCallback((text, flag) => {
        //@ts-ignore
        if (window.M && text) {
            document.documentElement.style.setProperty('--toast-color-code', flag)
            //@ts-ignore
            window.M.toast({ html: text })
        }
    }, [])
}
