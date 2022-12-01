import React, {FC} from 'react';
import {IParts} from "../../../types/parts";
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardMedia, Collapse,
    ListItemText,
    MenuItem,
    OutlinedInput, Select,
    Typography
} from "@mui/material";
import {MenuProps} from "../../Table/const";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ExpandMore} from "../../UI/ExpandMore";
import TableCell from "@mui/material/TableCell";
import {PartStatus} from "../../../constants/part_const";

type ListItemBlockProps = {
    item: IParts;
    color?: string,
    horizontal?: number
}

const IPartListWindow: FC<ListItemBlockProps> = ({item, color, horizontal}) => {
    const [expanded, setExpanded] = React.useState(false);


    const item_status = PartStatus.filter((e) => {
        if(item.item_status === e.number){
            return 1
        }
        return 0
    })[0]



    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: horizontal || 345 }}  className={"w-11/12 mx-auto h-25 my-6 " + color}>
            <CardContent className="flex flex-row">
                <CardMedia
                    className="w-4/12 h-25"
                    component="img"
                    image={item.img[0]}
                    alt="green iguana"
                />
                <div className="w-full h-full flex flex-col">
                    <Typography gutterBottom variant="subtitle1" component="div" className="w-11/12 mx-2 select-text">
                        {item.title}
                    </Typography>
                    <div className="w-full flex justify-end">
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </div>
                </div>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className="select-text">
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">SearchID: {item.searchID}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">LaptopID: {item._laptopSearchID}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Title: {item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Price: {item.price}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Amount Paid: {item.amount_paid}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2" style={{color: item_status.color}}>
                        Status: {item_status.number.toString() + ". " + item_status.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">Category: {item.category}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-fit min-h-10 border rounded-box p-2 my-2">Description: {item.description}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">EbayList: {item.ebaylist}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">CreatedBy: {item._createdBy.full_name}</Typography>
                    <Typography variant="body2" color="text.secondary" className="w-full h-10 border rounded-box p-2 my-2">CreatedAt: {item._createdAt}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default IPartListWindow;