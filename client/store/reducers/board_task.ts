import {BoardTaskAction, BoardTaskActionTypes, BoardTaskState} from "../../types/board_task";
import {WeekDay} from "../../types/subtypes/board_task_subtype";


const initialState: BoardTaskState = {
    BoardTaskInfo: {
        _id: "",
        created_by: "",
        task: "",
        description: "",
        status: 0,
        from: "",
        to: "",
        doDay: WeekDay.Monday
    },
    todoTodos: [],
    inprogressTodos: [],
    needreviewTodos: [],
    doneTodos: [],
    weeklyTodos: {
        monTodos: [],
        tueTodos: [],
        wedTodos: [],
        thuTodos: [],
        friTodos: [],
        satTodos: [],
        sunTodos: [],
    },
    error: ''
}

export const BoardTaskReducer = (state = initialState, action: BoardTaskAction): BoardTaskState => {
    switch (action.type) {
        case BoardTaskActionTypes.FETCH_BOARDTASK_ERROR:
            return {...state, error: action.payload}
        case BoardTaskActionTypes.FETCH_BOARDTASK:
            return {...state, BoardTaskInfo: action.payload}
        case BoardTaskActionTypes.FETCH_BOARDTASK_DONE:
            return {...state, doneTodos: action.payload}
        case BoardTaskActionTypes.FETCH_BOARDTASK_TODO:
            return {...state, todoTodos: action.payload}
        case BoardTaskActionTypes.FETCH_BOARDTASK_INPROGRESS:
            return {...state, inprogressTodos: action.payload}
        case BoardTaskActionTypes.FETCH_BOARDTASK_NEEDREVIEW:
            return {...state, needreviewTodos: action.payload}
        case BoardTaskActionTypes.FETCH_BOARDTASK_WEEKLY:
            return {...state, weeklyTodos: {...state.weeklyTodos, ...action.payload}}
        default:
            return state
    }
}