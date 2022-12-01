import React, {FC} from 'react';
import {Card, CardContent, CardMedia, Collapse, Typography} from "@mui/material";
import {IParts} from "../../../../../../types/parts";
import {PartStatus} from "../../../../../../constants/part_const";

interface IPartInfoItemProps {
    item: IParts
}

const PartInfoItem: FC<IPartInfoItemProps> = ({item}) => {

    const item_status = PartStatus.filter((e) => {
        if(item.item_status === e.number){
            return 1
        }
        return 0
    })[0]

    const date = new Date(+item._createdAt).toISOString().split('T')[0]

    return (
        <Card sx={{ maxWidth: 345 }}  className={"w-11/12 mx-auto h-25 my-6"}>
            <CardContent className="flex flex-row">
                <div className="w-full h-full flex flex-col">
                    <Typography gutterBottom variant="subtitle1" component="div" className="w-11/12 mx-2 select-text">
                        {item.title + `[${item.searchID}]`}
                    </Typography>
                    <div className="w-full flex justify-end">
                    </div>
                </div>
            </CardContent>
            <Collapse in={true} timeout="auto" unmountOnExit>
                <CardContent className="select-text">
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">SearchID: {item.searchID}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">_laptopSearchID: {item._laptopSearchID}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Price: {item.price + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Profit: {item.profit + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Amount Paid: {item.amount_paid + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className={"w-full h-10 border rounded-box p-2 my-2" + item_status.color}>{item_status.number + ". " + item_status.status}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Title: {item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Category: {item.category}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-fit min-h-10 border rounded-box p-2 my-2">Description: {item.description}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Ebay List: {item.ebaylist}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">_createdBy: {item._createdBy.full_name}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">_createdAt: {date}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PartInfoItem;