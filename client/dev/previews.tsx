import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import index from "../pages";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/index">
                <index/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;