
export const openSidebarHandler = (e:  any) => {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                const sidebar = document.getElementById('filter_sidebar')

                if(!sidebar){
                    reject('Sidebar is null!');
                }

                //@ts-ignore
                if(sidebar?.classList.item(1).split("%")[1] === "removed"){
                    // @ts-ignore
                    sidebar?.classList.replace(...[...sidebar.classList].filter(n => n.indexOf('close') !== -1), sidebar?.classList.item(1).split("%")[0])
                    setTimeout(() => { resolve('Success!');}, 550)
                    return;
                }
                // @ts-ignore
                sidebar?.classList.replace(...[...sidebar.classList].filter(n => n.indexOf('close') !== -1), sidebar?.classList.item(1)+"%removed")
                setTimeout(() => { resolve('Success!');}, 550)
            }, 100)
        }
    )
}

export const openShortSidebarHandler = (e: any) => {
    const sidebar = document.getElementById('adminsidebar')
    const arrows = document.querySelectorAll(".arrow")
    //@ts-ignore
    if(sidebar?.classList.item(1).split("%")[1] === "removed"){
        //@ts-ignore
        sidebar?.classList.replace(...[...sidebar.classList].filter(n => n.indexOf('close') !== -1), sidebar?.classList.item(1).split("%")[0])
        for(let i = 0; i < arrows.length; i++){
            arrows[i].classList.add("hide")
        }
        return;
    }
    //@ts-ignore
    sidebar?.classList.replace(...[...sidebar.classList].filter(n => n.indexOf('close') !== -1), sidebar?.classList.item(1)+"%removed")
    for(let i = 0; i < arrows.length; i++){
        arrows[i].classList.remove("hide")
    }
}

export const openSubMenuHandler = (e: any) => {
    let arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu")
}
