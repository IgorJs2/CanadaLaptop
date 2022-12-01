import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {AnyAction, applyMiddleware, compose} from "redux";
import {reducer, RootState} from "./reducers";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

// @ts-ignore
const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

// @ts-ignore
export const wrapper = createWrapper<RootState>(makeStore, {debug: false});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>