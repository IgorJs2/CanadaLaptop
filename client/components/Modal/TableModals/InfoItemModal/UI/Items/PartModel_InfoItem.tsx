import React, {FC} from 'react';
import {IPartModel} from "../../../../../../types/partsmodel";
import {Card, CardContent, CardMedia, Collapse, Typography} from "@mui/material";
import {ExpandMore} from "../../../../../UI/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IPartModelInfoItemProps {
    item: IPartModel
}

const PartModelInfoItem: FC<IPartModelInfoItemProps> = ({item}) => {
    return (
        <Card sx={{ maxWidth: 345 }}  className={"w-11/12 mx-auto h-25 my-6"}>
            <CardContent className="flex flex-row">
                <div className="w-full h-full flex flex-col">
                    <Typography gutterBottom variant="subtitle1" component="div" className="w-11/12 mx-2 select-text">
                        {item.name + `[${item.searchID}]`}
                    </Typography>
                    <div className="w-full flex justify-end">
                    </div>
                </div>
            </CardContent>
            <Collapse in={true} timeout="auto" unmountOnExit>
                <CardContent className="select-text">
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">SearchID: {item.searchID}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">_laptop_model_id: {item._laptop_model_id.searchID}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Price: {item.price + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Profit: {item.profit + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Amount Paid: {item.amount_paid + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-fit min-h-10 border rounded-box p-2 my-2">Description: {item.part_number}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-fit min-h-10 border rounded-box p-2 my-2">Description: {item.mpn}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PartModelInfoItem;