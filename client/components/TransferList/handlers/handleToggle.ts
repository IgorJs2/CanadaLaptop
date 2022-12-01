import {IParts} from "../../../types/parts";

export const handleToggle = (item: IParts, checked: IParts[], setChecked: React.Dispatch<React.SetStateAction<IParts[]>>) => {

    const currentIndex = checked.indexOf(item);
    const newChecked = [...checked];

    if (currentIndex === -1) {
        newChecked.push(item);
    } else {
        newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
};