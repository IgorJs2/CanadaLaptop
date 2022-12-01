import React, {FC} from 'react';
import {ILaptopModel} from "../../../../../../types/laptopmodel";
import {Card, CardContent, CardMedia, Collapse, Typography} from "@mui/material";
import {ExpandMore} from "../../../../../UI/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ILaptopModelInfoItemProps {
    item: ILaptopModel
}

const LaptopModelInfoItem: FC<ILaptopModelInfoItemProps> = ({item}) => {
    return (
        <Card sx={{ maxWidth: 345 }}  className={"w-11/12 mx-auto h-25 my-6"}>
            <CardContent className="flex flex-row">
                {/*<CardMedia*/}
                {/*    className="w-4/12 h-25"*/}
                {/*    component="img"*/}
                {/*    image={item.img[0]}*/}
                {/*    alt="green iguana"*/}
                {/*/>*/}
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
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Price: {item.price + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Profit: {item.profit + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Amount Paid: {item.amount_paid + "$"}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full min-h-10 h-fit border rounded-box p-2 my-2">
                        Defects: {item.defects.map((e) => (<div>{e}</div>))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-fit min-h-10 border rounded-box p-2 my-2">Description: {item.description}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default LaptopModelInfoItem;