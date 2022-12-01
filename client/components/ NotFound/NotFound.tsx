import React from 'react';
import {Typography} from "@mui/material";

const NotFound = () => {
    return (
        <div className="w-full mx-auto my-14 text-3xl text-white flex justify-center items-center text-center">
            <Typography variant="caption" display="block" gutterBottom>
                Not found
            </Typography>
        </div>
    );
};

export default NotFound;