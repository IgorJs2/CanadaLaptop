import {IParts} from "../../../types/parts";
import not from "../function/not";

export const handleCheckedRight = (setRight: React.Dispatch<React.SetStateAction<IParts[]>>, setLeft: React.Dispatch<React.SetStateAction<IParts[]>>, right: IParts[], left: IParts[], setChecked: React.Dispatch<React.SetStateAction<IParts[]>>,
                                    checked: IParts[], leftChecked: IParts[]) => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
};
