import {Dispatch} from "react";
import {BoardTaskAction, BoardTaskActionTypes, IBoardTask} from "../../types/board_task";
import axios from "axios";

export const fetchBoardTask = (token: string) => {
    return async (dispatch: Dispatch<BoardTaskAction>) => {
        try {
            const config = {
                "headers": {
                    "Authorization": "Bearer" + " " + token
                }
            };
            const response = await axios.get('http://localhost:5000/.../profile', config)
            dispatch({type: BoardTaskActionTypes.FETCH_BOARDTASK, payload: response.data})
        } catch (e) {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchToDoBoardTask = (payload: IBoardTask[]) => {
    return async (dispatch: Dispatch<BoardTaskAction>) => {
        try {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_TODO,
                payload
            })
        } catch (e) {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchInProgressBoardTask = (payload: IBoardTask[]) => {
    return async (dispatch: Dispatch<BoardTaskAction>) => {
        try {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_INPROGRESS,
                payload
            })
        } catch (e) {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchNeedReviewBoardTask = (payload: IBoardTask[]) => {
    return async (dispatch: Dispatch<BoardTaskAction>) => {
        try {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_NEEDREVIEW,
                payload
            })
        } catch (e) {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchDoneBoardTask = (payload: IBoardTask[]) => {
    return async (dispatch: Dispatch<BoardTaskAction>) => {
        try {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_DONE,
                payload
            })
        } catch (e) {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}

export const fetchWeeklyBoardTask = (day: string, value: IBoardTask[]) => {
    return async (dispatch: Dispatch<BoardTaskAction>) => {
        try {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_WEEKLY,
                payload: {[day]: value}
            })
        } catch (e) {
            dispatch({
                type: BoardTaskActionTypes.FETCH_BOARDTASK_ERROR,
                payload: 'Произошла ошибка при получении задачи'})
        }
    }
}