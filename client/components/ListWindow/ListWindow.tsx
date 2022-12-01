import React, {FC} from 'react';
import ListBlock from "./ListBlock";
import {IParts} from "../../types/parts";

type ListWindowProps = {
    headers: string[],
    item_statuses: number[][],
    items: IParts[]
}

const ListWindow: FC<ListWindowProps> = ({headers, items, item_statuses}) => {
    return (
        <div className="w-full h-full flex flex-row justify-center items-center">
            {
                headers.map((e, i) => {
                    return (<ListBlock header={e} item_statuses={item_statuses[i]} item={items} />)
                })
            }
        </div>
    );
};

export default ListWindow;