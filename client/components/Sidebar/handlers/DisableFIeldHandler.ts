export const DisableFIeldHandler = () => {
    const Elements = document.querySelectorAll(".filter_input")
    for (let i = 0; i < Elements.length; i++) {
        console.log(Elements[i].getAttribute("placeholder"))
        if (Elements[i].getAttribute("placeholder") !== "Search") {
            Elements[i].setAttribute("disabled", "true")
        }
    }
}

export const EnableFieldHandler = () => {
    const Elements = document.querySelectorAll(".filter_input")
    for (let i = 0; i < Elements.length; i++) {
        Elements[i].removeAttribute("disabled")
    }
}