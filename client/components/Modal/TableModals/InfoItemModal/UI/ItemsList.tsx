import React, {FC, useState} from 'react';
import {TTableArrayObjects, TTableObjects} from "../../../../../types/subtypes/Object_subtypes";
import {getObjectTypeName} from "../../../../../helpers/getObjectTypeName";
import {item_types} from "../../../../../constants/global_const";
import LaptopModelInfoItem from "./Items/LaptopModel_InfoItem";
import {ILaptopModel} from "../../../../../types/laptopmodel";
import LaptopInfoItem from "./Items/Laptop_InfoItem";
import {ILaptop} from "../../../../../types/laptop";
import PartModelInfoItem from "./Items/PartModel_InfoItem";
import {IPartModel} from "../../../../../types/partsmodel";
import PartInfoItem from "./Items/Part_InfoItem";
import {IParts} from "../../../../../types/parts";

interface IItemsListProps {
    items: TTableObjects[]
}

const ItemsList: FC<IItemsListProps> = ({items}) => {

    const [item_type, setItemType] = useState<string>(getObjectTypeName(items[0]))


    return (
        <div className="w-11/12 max-h-48 mx-auto flex flex-row flex-wrap overflow-y-scroll">

            {
                item_type == item_types.LaptopModel ?
                    (
                        items.map((e) => {
                            return (
                                <LaptopModelInfoItem item={e as ILaptopModel} />
                            )
                        })
                    ) : <></>
            }
            {
                item_type == item_types.Laptop ?
                    (
                        items.map((e) => {
                            return (
                                <LaptopInfoItem item={e as ILaptop} />
                            )
                        })
                    ) : <></>
            }
            {
                item_type == item_types.PartModel ?
                    (
                        items.map((e) => {
                            return (
                                <PartModelInfoItem item={e as IPartModel} />
                            )
                        })
                    ) : <></>
            }
            {
                item_type == item_types.Part ?
                    (
                        items.map((e) => {
                            return (
                                <PartInfoItem item={e as IParts} />
                            )
                        })
                    ) : <></>
            }

        </div>
    );
};

export default ItemsList;