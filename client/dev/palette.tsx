import React from 'react';
import {
    Category,
    Component,
    Variant,
    Palette,
} from '@react-buddy/ide-toolbox';
import MainLayouts from "../layouts/MainLayout";
import {Button, Divider, InputAdornment, TextField} from "@mui/material";
import MUIPalette from "@react-buddy/palette-mui";
import TableItems from "../components/TableItems/TableItems";
import ChatList from "../components/ChatList";
import ChatInfo from "../components/ChatInfo";
import {Search} from "@mui/icons-material";

export const PaletteTree = () => (
    <Palette>
        <Category name="HTML">
            <Component name="a">
                <Variant requiredParams={['href']}>
                    <a>Link</a>
                </Variant>
            </Component>
            <Component name="button">
                <Variant>
                    <button>Button</button>
                </Variant>
            </Component>
        </Category>
        <Category name="MyComponents">
            <Component name="button">
                <Variant>
                    <Button color="error" variant="outlined">Text</Button>
                </Variant>
            </Component>
            <Component name={"Custom search"}>
                <Variant>
                    <TextField  InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            </InputAdornment>
                        ),
                    }} id="outlined-basic" label="Search content here..." variant="outlined" color="info" className="my-4 float-left w-full"/>
                </Variant>
            </Component>
            <Component name="Fully layout">
                <Variant>
                    <MainLayouts active={1}>
                        <div className="w-full h-full my-10 mx-auto flex flex-row ml-36 mt-48">
                            <div className="w-11/12 bg-main-dark h-96 rounded-box mr-5">
                            </div>
                        </div>
                    </MainLayouts>
                </Variant>
            </Component>
            <Component name="Fully two blocks layout">
                <Variant>
                    <MainLayouts active={1}>
                        <div className="w-full h-full my-10 mx-auto flex flex-row ml-32 mt-48">
                            <div className="w-3/12 bg-main-dark h-fit pb-4 rounded-box mr-5 rounded-2xl">
                                <div className="w-11/12 mx-auto mt-4 text-center text-white">

                                </div>
                            </div>
                            <div className="w-8/12 h-fit bg-main-dark rounded-box ml-5 rounded-2xl">

                            </div>
                        </div>
                    </MainLayouts>
                </Variant>
            </Component>
        </Category>
        <MUIPalette/>
    </Palette>
);
