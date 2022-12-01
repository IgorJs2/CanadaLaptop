const LoginChange = (error: string) => {
    const loginInput = document.querySelector("#login")
    const loginError = document.querySelector("#loginError")
    if (loginError && loginError.innerHTML.length < 5) {
        loginError.innerHTML = loginError.innerHTML + " " + (error.split("LOGIN:")[1] || error.split("EMAIL:")[0])
    }
    loginError?.classList.remove("hidden")
    loginInput?.classList.remove("border-none")
    loginInput?.classList.add("border-2")
    loginInput?.classList.add("border-red")
}

const PasswordChange = (error: string) => {
    const passwordInput = document.querySelector("#password")
    const passwordError = document.querySelector("#passwordError")
    if (passwordError && passwordError.innerHTML.length < 5) {
        passwordError.innerHTML = passwordError.innerHTML + " " + error.split("PASSWORD:")[1]
    }
    passwordError?.classList.remove("hidden")
    passwordInput?.classList.remove("border-none")
    passwordInput?.classList.add("border-2")
    passwordInput?.classList.add("border-red")
}

const TypeChange = () => {
    const typeButton = document.querySelectorAll('[name="type"]')
    console.log(typeButton)
    typeButton.forEach((e) => {
        e?.classList.add("border")
        e?.classList.add("border-red")
    })
}

const ClearInputErrors = (element: string[]) => {
    const loginInput = document.querySelector("#login")
    const loginError = document.querySelector("#loginError")
    const passwordInput = document.querySelector("#password")
    const passwordError = document.querySelector("#passwordError")
    const typeButton = document.querySelectorAll("#type")
    for(let i = 0; i < element.length; i++){
        if(element[i] === "ALL"){
            loginError?.classList.add("hidden")
            loginInput?.classList.add("border-none")
            loginInput?.classList.remove("border-2")
            loginInput?.classList.remove("border-red")
            if(loginError)
                loginError.innerHTML = "•"
            passwordError?.classList.add("hidden")
            passwordInput?.classList.add("border-none")
            passwordInput?.classList.remove("border-2")
            passwordInput?.classList.remove("border-red")
            if(passwordError)
                passwordError.innerHTML = "•"
            typeButton.forEach((e) => {
                e?.classList.remove("border")
                e?.classList.remove("border-red")
            })
            return 0
        }
        if (element[i] === "Login") {
            loginError?.classList.add("hidden")
            loginInput?.classList.add("border-none")
            loginInput?.classList.remove("border-2")
            loginInput?.classList.remove("border-red")
            if(loginError)
                loginError.innerHTML = "•"
        }
        if (element[i] === "Password") {
            passwordError?.classList.add("hidden")
            passwordInput?.classList.add("border-none")
            passwordInput?.classList.remove("border-2")
            passwordInput?.classList.remove("border-red")
            if(passwordError)
                passwordError.innerHTML = "•"
        }
        if(element[i] === "Type"){
            typeButton.forEach((e) => {
                e?.classList.remove("border")
                e?.classList.remove("border-red")
            })
        }
    }
}


const AutorizePass = (fields: string[], text: string) => {
    ClearInputErrors(fields)
    const alert = document.querySelector("#alert")
    //alert.setAttribute("hidden", "false")
    //alert.insertAdjacentText("beforebegin", text)
}


const AuthModalFormChanger = (errors: string[], fields: string[]) => {
    for (let i = 0; i < fields.length; i++) {
        if (fields.includes("Login")) {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].includes("LOGIN:")) {
                    LoginChange(errors[i])
                }
            }
        }
        if (fields.includes("Password")) {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].includes("PASSWORD:")) {
                    PasswordChange(errors[i])
                }
            }
        }
        if (fields.includes("Type")) {
            console.log(1)
            TypeChange()
        }
    }
};

export {AuthModalFormChanger, ClearInputErrors, AutorizePass};