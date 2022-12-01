import {IParts} from "../../../types/parts";

export default function intersection(a: IParts[], b: IParts[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}