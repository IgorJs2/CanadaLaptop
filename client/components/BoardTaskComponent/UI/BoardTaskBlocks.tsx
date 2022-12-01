import React from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {Status, TodosStatus, TodosView, WeekDay, WeekDayTodos} from '../../../types/subtypes/board_task_subtype'
import BoardTaskItem from './BoardTaskItem'
import {IBoardTask} from "../../../types/board_task";
import {useAction} from "../../../hooks/useAction";
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import BoardTaskBlock from "./BoardTaskBlock";

interface Props {
    view: TodosView
}

const BoardTaskBlocks: React.FC<Props> = ({view,}) => {

    const {
        fetchToDoBoardTask,
        fetchInProgressBoardTask,
        fetchNeedReviewBoardTask,
        fetchDoneBoardTask,
        fetchWeeklyBoardTask
    } = useAction()

    const {
        todoTodos,
        inprogressTodos,
        doneTodos,
        needreviewTodos,
        weeklyTodos
    } = useTypeSelector(state => state.board_task)
    const {monTodos, tueTodos, wedTodos, thuTodos, friTodos, satTodos, sunTodos} = weeklyTodos

    return (
        <div className='w-full flex justify-center items-center text-center gap-2'>
            <BoardTaskBlock droppableId={TodosStatus.ToDoTodos} drappableName={"To Do"} todos={todoTodos} setTodos={fetchToDoBoardTask}/>
            <BoardTaskBlock droppableId={TodosStatus.InProgressTodos} drappableName={"In Progress"} todos={inprogressTodos} setTodos={fetchInProgressBoardTask}/>
            <BoardTaskBlock droppableId={TodosStatus.NeedReviewTodos} drappableName={"Need Review"} todos={needreviewTodos} setTodos={fetchNeedReviewBoardTask}/>
            <BoardTaskBlock droppableId={TodosStatus.DoneTodos} drappableName={"Done"} todos={doneTodos}  setTodos={fetchDoneBoardTask}/>
        </div>
    )
}

export default BoardTaskBlocks


/*
<div className='grid grid-cols-1 w-full gap-2 mt-4 lg:grid-cols-5'>
    <Droppable droppableId={WeekDayTodos.MonTodos}>
    {
    (droppableProvided, droppableSnapshot) => (
    <div className='bg-gray-400 px-5 py-3 rounded-md'
         ref={droppableProvided.innerRef}
         {...droppableProvided.droppableProps}
    >
              <span className='text-white text-2xl font-semibold'>
                {WeekDay.Monday}
              </span>
        {monTodos?.map((todo, index) =>
            <BoardTaskItem
                index={index}
                key={todo?._id}
                todo={todo}
                todos={monTodos}
            />
        )}
        {droppableProvided.placeholder}
    </div>
)}
</Droppable>
<Droppable droppableId={WeekDayTodos.TueTodos}>
    {
        (droppableProvided, droppableSnapshot) => (
            <div
                className={`bg-gray-400 px-5 py-3 rounded-md ${droppableSnapshot.isDraggingOver ? 'opacity-80' : ''}`}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
            >
              <span className='text-white text-2xl font-semibold'>
                {WeekDay.Tuesday}
              </span>
                {tueTodos.map((todo, index) =>
                    <BoardTaskItem
                        index={index}
                        key={todo?._id}
                        todo={todo}
                        todos={tueTodos}
                    />
                )}
                {droppableProvided.placeholder}
            </div>
        )}
</Droppable>
<Droppable droppableId={WeekDayTodos.WedTodos}>
    {
        (droppableProvided, droppableSnapshot) => (
            <div className='bg-gray-400 px-5 py-3 rounded-md'
                 ref={droppableProvided.innerRef}
                 {...droppableProvided.droppableProps}
            >
              <span className='text-white text-2xl font-semibold'>
                {WeekDay.Wednesday}
              </span>
                {wedTodos.map((todo, index) =>
                    <BoardTaskItem
                        index={index}
                        key={todo._id}
                        todo={todo}
                        todos={wedTodos}
                    />
                )}
                {droppableProvided.placeholder}
            </div>
        )}
</Droppable>
<Droppable droppableId={WeekDayTodos.ThuTodos}>
    {
        (droppableProvided, droppableSnapshot) => (
            <div className='bg-gray-400 px-5 py-3 rounded-md'
                 ref={droppableProvided.innerRef}
                 {...droppableProvided.droppableProps}
            >
              <span className='text-white text-2xl font-semibold'>
                {WeekDay.Thursday}
              </span>
                {thuTodos.map((todo, index) =>
                    <BoardTaskItem
                        index={index}
                        key={todo._id}
                        todo={todo}
                        todos={thuTodos}
                    />
                )}
                {droppableProvided.placeholder}
            </div>
        )}
</Droppable>
<Droppable droppableId={WeekDayTodos.FriTodos}>
    {
        (droppableProvided, droppableSnapshot) => (
            <div className='bg-gray-400 px-5 py-3 rounded-md'
                 ref={droppableProvided.innerRef}
                 {...droppableProvided.droppableProps}
            >
              <span className='text-white text-2xl font-semibold'>
                {WeekDay.Friday}
              </span>
                {friTodos.map((todo, index) =>
                    <BoardTaskItem
                        index={index}
                        key={todo._id}
                        todo={todo}
                        todos={friTodos}
                    />
                )}
                {droppableProvided.placeholder}
            </div>
        )}
</Droppable>
<Droppable droppableId={WeekDayTodos.SatTodos}>
    {
        (droppableProvided, droppableSnapshot) => (
            <div className='bg-gray-400 px-5 py-3 rounded-md'
                 ref={droppableProvided.innerRef}
                 {...droppableProvided.droppableProps}
            >
              <span className='text-white text-2xl font-semibold'>
                {WeekDay.Satuday}
              </span>
                {satTodos.map((todo, index) =>
                    <BoardTaskItem
                        index={index}
                        key={todo._id}
                        todo={todo}
                        todos={satTodos}
                    />
                )}
                {droppableProvided.placeholder}
            </div>
        )}
</Droppable>
<Droppable droppableId={WeekDayTodos.SunTodos}>
    {
        (droppableProvided, droppableSnapshot) => (
            <div className='bg-gray-400 px-5 py-3 rounded-md'
                 ref={droppableProvided.innerRef}
                 {...droppableProvided.droppableProps}
            >
              <span className='text-white text-2xl font-semibold'>
                {WeekDay.Sunday}
              </span>
                {sunTodos.map((todo, index) =>
                    <BoardTaskItem
                        index={index}
                        key={todo._id}
                        todo={todo}
                        todos={sunTodos}
                    />
                )}
                {droppableProvided.placeholder}
            </div>
        )}
</Droppable>
</div>*/
