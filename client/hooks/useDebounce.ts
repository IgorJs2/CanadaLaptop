import {useCallback, useRef} from "react";

export const useDebounce = (callback: any, delay: number) => {
    const timer = useRef(null);

    const debounceCallback = useCallback((...args) => {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        // @ts-ignore
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])

    return debounceCallback
}