import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {ILaptopPriorityModel} from "../../../types/laptopmodel";
import {PriorityCategory} from "../../../constants/global_const";

interface IPriorityItemProps  {
    item: ILaptopPriorityModel
}

const PriorityItem: FC<IPriorityItemProps> = ({item}) => {
        return (
            <Card sx={{ display: 'flex' }} className="mx-8 my-4">
                {/*<Box sx={{ display: 'flex', flexDirection: 'column' }} className="w-full">*/}
                {/*    <CardContent sx={{ flex: '1 0 auto' }}>*/}
                {/*        <Typography component="div" variant="h5">*/}
                {/*            {item.model}*/}
                {/*        </Typography>*/}
                {/*        /!*<Typography variant="subtitle1" color="text.secondary" component="div">*!/*/}
                {/*        /!*    {item.best_category === PriorityCategory.Count ? "Number of buyed laptop: " + item.count : ""}*!/*/}
                {/*        /!*    {item.best_category === PriorityCategory.Profit ? "Laptop profit: " + item.profit + "$" : ""}*!/*/}
                {/*        /!*    {item.best_category === PriorityCategory.Quantity ? "Laptop Quantity: " + item.quantity : ""}*!/*/}
                {/*        /!*</Typography>*!/*/}
                {/*    </CardContent>*/}
                {/*</Box>*/}
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    sx={{ width: 151 }}*/}
                {/*    image=""*/}
                {/*    alt="Live from space album cover"*/}
                {/*    className="mx-2"*/}
                {/*/>*/}
            </Card>
        )
};

export default PriorityItem;