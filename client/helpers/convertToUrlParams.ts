

export const convertArrayToUrlParams = (value: string[]) => {
    let final_string = "?"
    let array_params = value.join("><")
    return final_string + "array=" + array_params
}