import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    IconButton, List, ListItemButton, ListItemIcon, ListItemText,
    Typography
} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import {Draggable} from 'react-beautiful-dnd'
import {Status} from '../../../types/subtypes/board_task_subtype'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {BoardTaskAction, IBoardTask} from "../../../types/board_task";
import {Dispatch} from "redux";
import {useRouter} from "next/router";
import BugReportIcon from '@mui/icons-material/BugReport';
import {StarBorder} from "@mui/icons-material";

interface Props {
    hasDoneIcon?: boolean
    index: number
    todo: IBoardTask
    todos: IBoardTask[]
    setTodos?: (payload: IBoardTask[]) => (dispatch: Dispatch<BoardTaskAction>) => Promise<void>
}

const BoardTaskItem: React.FC<Props> = ({hasDoneIcon = true, index, todo, todos, setTodos}) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editName, setEditName] = useState<string>(todo.task)
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const [open, setOpen] =  useState<boolean>(false)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    const handleEdit = () => {
        if (todo.status !== Status.Done && !edit) {
            setEdit(true)
        }
    }

    const handleEditNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditName(e.target.value)
    }

    const handleEditNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!setTodos){
            return;
        }
        setTodos(todos.map((item) => item._id === todo._id ? {...item, name: editName} : item))
        setEdit(false)
    }

    const handleDelete = () => {
        if(!setTodos){
            return;
        }
        setTodos(todos.filter((item) => item._id !== todo._id))
    }

    const handleDone = () => {
        if(!setTodos){
            return;
        }
        setTodos(todos.map((item) => item._id === todo._id ? {...item, isDone: item.status === Status.Done} : item))
    }

    if(!todo._id){
        return (<></>)
    }

    return (
        <Draggable draggableId={todo._id.toString()} index={index} key={todo._id}>
            {
                (draggableProvided, draggableSnapshot) => (
                    <form
                        className='flex rounded-md bg-yellow-300  w-full p-[20px] mt-[15px] transition hover:scale-105 hover:shadow-md'
                        onSubmit={handleEditNameSubmit}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                    >
                        <Card className="w-full">
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings" onClick={() => setOpen(!open)}>
                                        <MoreHorizIcon className="pointer-events-none" />
                                    </IconButton>
                                }
                                title={todo._id}
                                subheader="September 14, 2016"
                            />
                            <CardMedia className="w-full flex justify-end items-end px-4 py-4" onClick={() => router.push("board/" + todo._id)}>
                                <Avatar src="" />
                            </CardMedia>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <BugReportIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Send Report" className="text-red" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </Card>
                    </form>
                )
            }
        </Draggable>
    )
}

//@ts-ignore
export default BoardTaskItem