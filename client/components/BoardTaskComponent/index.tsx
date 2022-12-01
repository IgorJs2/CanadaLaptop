import type {NextPage} from 'next'
import {useEffect, useState} from 'react'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import BoardTaskBlocks from './UI/BoardTaskBlocks'
import {Status, TodosStatus, TodosView, WeekDay, WeekDayTodos} from '../../types/subtypes/board_task_subtype'
import styles from './style.module.css'
import InputField from "./UI/inputField";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useAction} from "../../hooks/useAction";
import {
    fetchDoneBoardTask,
    fetchInProgressBoardTask,
    fetchNeedReviewBoardTask,
    fetchToDoBoardTask, fetchWeeklyBoardTask
} from "../../store/action-creators/board_task";


const BoardTaskComponent: NextPage = () => {
    const [name, setName] = useState<string>('')
    const [view, setView] = useState<TodosView>(TodosView.KanbanView)

    const {fetchToDoBoardTask, fetchInProgressBoardTask, fetchNeedReviewBoardTask, fetchDoneBoardTask, fetchWeeklyBoardTask} = useAction()

    const {todoTodos, inprogressTodos, doneTodos, needreviewTodos, weeklyTodos} = useTypeSelector(state => state.board_task)
    const {monTodos, tueTodos, wedTodos, thuTodos, friTodos, satTodos, sunTodos} = weeklyTodos

    useEffect(() => {
        let backlogTodos = window.localStorage.getItem('backlogTodos')
        if (backlogTodos) {
            let parsed = JSON.parse(backlogTodos)
            fetchToDoBoardTask(parsed)
        }
        let activeTodos = window.localStorage.getItem('activeTodos')
        if (activeTodos) {
            let parsed = JSON.parse(activeTodos)
            fetchInProgressBoardTask(parsed)
        }
        let reviewTodos = window.localStorage.getItem('reviewTodos')
        if (reviewTodos) {
            let parsed = JSON.parse(reviewTodos)
            fetchNeedReviewBoardTask(parsed)
        }
        let completedTodos = window.localStorage.getItem('completedTodos')
        if (completedTodos) {
            let parsed = JSON.parse(completedTodos)
            fetchDoneBoardTask(parsed)
        }

        let monTodos = window.localStorage.getItem('monTodos')
        if (monTodos) {
            let parsed = JSON.parse(monTodos)
            fetchWeeklyBoardTask("monTodos", parsed)
        }
        let tueTodos = window.localStorage.getItem('tueTodos')
        if (tueTodos) {
            let parsed = JSON.parse(tueTodos)
            fetchWeeklyBoardTask("tueTodos", parsed)
        }
        let wedTodos = window.localStorage.getItem('wedTodos')
        if (wedTodos) {
            let parsed = JSON.parse(wedTodos)
            fetchWeeklyBoardTask("wedTodos", parsed)
        }
        let thuTodos = window.localStorage.getItem('thuTodos')
        if (thuTodos) {
            let parsed = JSON.parse(thuTodos)
            fetchWeeklyBoardTask("thuTodos", parsed)
        }
        let friTodos = window.localStorage.getItem('friTodos')
        if (friTodos) {
            let parsed = JSON.parse(friTodos)
            fetchWeeklyBoardTask("friTodos", parsed)
        }
        let satTodos = window.localStorage.getItem('satTodos')
        if (satTodos) {
            let parsed = JSON.parse(satTodos)
            fetchWeeklyBoardTask("satTodos", parsed)
        }
        let sunTodos = window.localStorage.getItem('sunTodos')
        if (sunTodos) {
            let parsed = JSON.parse(sunTodos)
            fetchWeeklyBoardTask("sunTodos", parsed)
        }
    }, [])

    const addNewTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (name) {
            const newTodo = {
                _id: Date.now().toString(),
                created_by: "Ihor",
                task: "Make code",
                description: "Make more code tatartaerar",
                status: Status.ToDo,
                from: "Systme",
                to: "Ihorka",
                doDay: WeekDay.Monday

            }

            fetchToDoBoardTask([...todoTodos, newTodo])
            fetchWeeklyBoardTask("monTodos", [...monTodos, newTodo])

            setName('')
        }
    }

    const onDragEndHandler = (result: DropResult) => {
        const {destination, source} = result

        if (!destination || (destination.droppableId === source.droppableId
            && destination.index === source.index)) return

        let add,
            backlog = todoTodos,
            active = inprogressTodos,
            review = needreviewTodos,
            complete = doneTodos,
            mon = monTodos,
            tue = tueTodos,
            wed = wedTodos,
            thu = thuTodos,
            fri = friTodos,
            sat = satTodos,
            sun = sunTodos

        switch (source.droppableId) {
            case TodosStatus.ToDoTodos:
                add = todoTodos[source.index]
                backlog.splice(source.index, 1)
                break
            case TodosStatus.InProgressTodos:
                add = active[source.index]
                active.splice(source.index, 1)
                break
            case TodosStatus.NeedReviewTodos:
                add = review[source.index]
                active.splice(source.index, 1)
                break
            case TodosStatus.DoneTodos:
                add = complete[source.index]
                complete.splice(source.index, 1)
                break

            case WeekDayTodos.MonTodos:
                add = mon[source.index]
                mon.splice(source.index, 1)
                break
            case WeekDayTodos.TueTodos:
                add = tue[source.index]
                tue.splice(source.index, 1)
                break
            case WeekDayTodos.WedTodos:
                add = wed[source.index]
                wed.splice(source.index, 1)
                break
            case WeekDayTodos.ThuTodos:
                add = thu[source.index]
                thu.splice(source.index, 1)
                break
            case WeekDayTodos.FriTodos:
                add = fri[source.index]
                fri.splice(source.index, 1)
                break
            case WeekDayTodos.SatTodos:
                add = sat[source.index]
                sat.splice(source.index, 1)
                break
            case WeekDayTodos.SunTodos:
                add = sun[source.index]
                sun.splice(source.index, 1)
                break
        }

        if (add) {
            switch (destination.droppableId) {
                case TodosStatus.ToDoTodos:
                    backlog.splice(destination.index, 0, add)
                    break
                case TodosStatus.InProgressTodos:
                    active.splice(destination.index, 0, add)
                    break
                case TodosStatus.NeedReviewTodos:
                    review.splice(destination.index, 0, add)
                    break
                case TodosStatus.DoneTodos:
                    complete.splice(destination.index, 0, add)
                    break
                case WeekDayTodos.MonTodos:
                    mon.splice(destination.index, 0, add)
                    break
                case WeekDayTodos.TueTodos:
                    tue.splice(destination.index, 0, add)
                    break
                case WeekDayTodos.WedTodos:
                    wed.splice(destination.index, 0, add)
                    break
                case WeekDayTodos.ThuTodos:
                    thu.splice(destination.index, 0, add)
                    break
                case WeekDayTodos.FriTodos:
                    fri.splice(destination.index, 0, add)
                    break
                case WeekDayTodos.SatTodos:
                    sat.splice(destination.index, 0, add)
                    break
                case WeekDayTodos.SunTodos:
                    sun.splice(destination.index, 0, add)
                    break
            }
        }

        fetchToDoBoardTask(backlog)
        fetchInProgressBoardTask(active)
        fetchNeedReviewBoardTask(review)
        fetchDoneBoardTask(complete)

        fetchWeeklyBoardTask("monTodos", mon)
        fetchWeeklyBoardTask("tueTodos", tue)
        fetchWeeklyBoardTask("wedTodos", wed)
        fetchWeeklyBoardTask("thuTodos", thu)
        fetchWeeklyBoardTask("friTodos", fri)
        fetchWeeklyBoardTask("satTodos", sat)
        fetchWeeklyBoardTask("sunTodos", sun)

        if (window) {
            window.localStorage.setItem('backlogTodos', JSON.stringify(backlog))
            window.localStorage.setItem('activeTodos', JSON.stringify(active))
            window.localStorage.setItem('reviewTodos', JSON.stringify(review))
            window.localStorage.setItem('completedTodos', JSON.stringify(complete))

            window.localStorage.setItem('monTodos', JSON.stringify(mon))
            window.localStorage.setItem('tueTodos', JSON.stringify(tue))
            window.localStorage.setItem('wedTodos', JSON.stringify(wed))
            window.localStorage.setItem('thuTodos', JSON.stringify(thu))
            window.localStorage.setItem('friTodos', JSON.stringify(fri))
            window.localStorage.setItem('satTodos', JSON.stringify(sat))
            window.localStorage.setItem('sunTodos', JSON.stringify(sun))
        }
    }


    return (
        <DragDropContext onDragEnd={onDragEndHandler}>
            {/*<InputField name={name} setName={setName} addNewTodo={addNewTodo} />*/}
            <BoardTaskBlocks
                view={view}
            />
        </DragDropContext>
    )
}

export default BoardTaskComponent