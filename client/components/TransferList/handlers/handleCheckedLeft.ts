import {IParts} from "../../../types/parts";
import not from "../function/not";

export const handleCheckedLeft = (setRight: React.Dispatch<React.SetStateAction<IParts[]>>, setLeft: React.Dispatch<React.SetStateAction<IParts[]>>, right: IParts[], left: IParts[], setChecked: React.Dispatch<React.SetStateAction<IParts[]>>,
                                  checked: IParts[], rightChecked: IParts[]) => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
};