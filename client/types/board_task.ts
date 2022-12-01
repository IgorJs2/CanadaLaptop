import {Status, WeekDay} from "./subtypes/board_task_subtype";

export interface IBoardTask {
    _id: string,
    created_by: string,
    task: string,
    description: string,
    status: Status,
    from: string,
    to: string,
    doDay: WeekDay
}


export interface BoardTaskState {
    BoardTaskInfo: IBoardTask;
    todoTodos: IBoardTask[];
    inprogressTodos: IBoardTask[];
    needreviewTodos: IBoardTask[];
    doneTodos: IBoardTask[];
    weeklyTodos: {
        monTodos: IBoardTask[];
        tueTodos: IBoardTask[];
        wedTodos: IBoardTask[];
        thuTodos: IBoardTask[];
        friTodos: IBoardTask[];
        satTodos: IBoardTask[];
        sunTodos: IBoardTask[];
    }
    error: string;
}

export enum BoardTaskActionTypes {
    FETCH_BOARDTASK = 'FETCH_BOARDTASK',
    FETCH_BOARDTASK_TODO = 'FETCH_BOARDTASK_TODO',
    FETCH_BOARDTASK_INPROGRESS = 'FETCH_BOARDTASK_INPROGRESS',
    FETCH_BOARDTASK_NEEDREVIEW = 'FETCH_BOARDTASK_NEEDREVIEW',
    FETCH_BOARDTASK_DONE = 'FETCH_BOARDTASK_DONE',
    FETCH_BOARDTASK_WEEKLY = 'FETCH_BOARDTASK_WEEKLY',
    FETCH_BOARDTASK_ERROR = 'FETCH_BOARDTASK_ERROR',
}

interface FetchBoardTaskAction {
    type: BoardTaskActionTypes.FETCH_BOARDTASK;
    payload: IBoardTask
}

interface FetchBoardTaskToDoAction {
    type: BoardTaskActionTypes.FETCH_BOARDTASK_TODO;
    payload: IBoardTask[]
}

interface FetchBoardTaskInProgressAction {
    type: BoardTaskActionTypes.FETCH_BOARDTASK_INPROGRESS;
    payload: IBoardTask[]
}

interface FetchBoardTaskNeedReviewAction {
    type: BoardTaskActionTypes.FETCH_BOARDTASK_NEEDREVIEW;
    payload: IBoardTask[]
}

interface FetchBoardTaskDoneAction {
    type: BoardTaskActionTypes.FETCH_BOARDTASK_DONE;
    payload: IBoardTask[]
}

interface FetchBoardTaskWeeklyAction {
    type: BoardTaskActionTypes.FETCH_BOARDTASK_WEEKLY;
    payload: {[key: string]: IBoardTask[]}
}

interface FetchBoardTaskErrorAction {
    type: BoardTaskActionTypes.FETCH_BOARDTASK_ERROR;
    payload: string
}

export type BoardTaskAction =
    FetchBoardTaskToDoAction
    | FetchBoardTaskInProgressAction
    | FetchBoardTaskNeedReviewAction
    | FetchBoardTaskDoneAction
    | FetchBoardTaskWeeklyAction
    | FetchBoardTaskAction
    | FetchBoardTaskErrorAction