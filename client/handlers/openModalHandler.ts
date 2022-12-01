import React from "react";

export const openModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    const allModals = document.querySelectorAll(".modal-window")
    const target = e.target as Element

    if(allModals){
        allModals.forEach((m) => {
            console.log(target.nextElementSibling?.getAttribute("id"))
            console.log(m.getAttribute("id"))
            if(target.nextElementSibling?.getAttribute("id") !== m.getAttribute("id")){
                if(!m.classList.contains("hidden")){
                    m.classList.add("hidden")
                }
            }
        })
    }

    target.nextElementSibling?.classList.toggle("hidden")
}