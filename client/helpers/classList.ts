
//@ts-ignore
export const classLister = styleObject => (...classList: any) =>
    //@ts-ignore
    classList.reduce((list, myClass) => {
        let output = list;
        if (styleObject[myClass]) {
            if (list) output += ' '; // appends a space if list is not empty
            output += styleObject[myClass];
            //Above: append 'myClass' from styleObject to the list if it is defined
        }
        return output;
    }, '');
