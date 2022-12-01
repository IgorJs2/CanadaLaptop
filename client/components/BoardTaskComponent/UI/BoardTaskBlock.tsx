import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import BoardTaskItem from './BoardTaskItem'
import {BoardTaskAction, IBoardTask} from "../../../types/board_task";
import {Dispatch} from "redux";

type Props = {
    droppableId: string,
    drappableName: string,
    todos: IBoardTask[],
    setTodos?: (payload: IBoardTask[]) => (dispatch: Dispatch<BoardTaskAction>) => Promise<void>
}

const BoardTaskBlock: React.FC<Props> = ({ droppableId, drappableName, todos, setTodos }) => (
    <Droppable droppableId={droppableId}>
        {
            (droppableProvided, droppableSnapshot) => (
                <div className='w-1/5 bg-main-dark-2 min-h-48 max-h-48 overflow-y-scroll rounded-2xl p-4'
                     ref={droppableProvided.innerRef}
                     {...droppableProvided.droppableProps}
                >
                  <span className='text-white text-2xl font-semibold'>
                    {drappableName}
                  </span>
                    {todos.map((todo, index) =>
                        <BoardTaskItem index={index} key={todo._id} todo={todo} todos={todos} setTodos={setTodos}/>
                    )}
                </div>
            )}
    </Droppable>
)

//@ts-ignore
export default BoardTaskBlock