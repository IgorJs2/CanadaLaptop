export const CheckBoxHandlers = (number: number) => {
    const CheckBoxs = document.querySelectorAll(".filter_checkbox")
    for(let i = 0; i < CheckBoxs.length; i++){
        if(i+1 !== number){
            //@ts-ignore
            CheckBoxs[i].checked = false;
        }
    }
    let countBox = 0
    for(let i = 0; i < CheckBoxs.length; i++){
        //@ts-ignore
        if(CheckBoxs[i].checked === false){
            countBox+=1;
        }
    }
    const CheckBoxInputs = document.querySelectorAll(".filter_checkbox_input")
    if(number === 5){
        for(let i = 0; i < CheckBoxInputs.length; i++){
            CheckBoxInputs[i].removeAttribute("disabled")
        }
    }
    else{
        for(let i = 0; i < CheckBoxInputs.length; i++){
            CheckBoxInputs[i].setAttribute("disabled", "true")
        }
    }
    if(countBox === 5){
        return false
    }
    return true
}