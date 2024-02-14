import { DropResult } from 'react-beautiful-dnd';
import { configureStore } from '@reduxjs/toolkit';

const ADD = "ADD";
const DELETE = 'DELETE';
const UPDATE = "UPDATE";
const DRAG = "DRAG";

interface IStoreAction {
    type: string;
    text: string;
    boardId: string;
    id: number;
    index: number;
    dragInfo: DropResult
}

export interface IToDoState {
    [key: string]: ITodo[];
}

export interface ITodo {
    id: number;
    text: string;
}

export const addToDo = (text : string, boardId: string) => {
    return {
        type: ADD,
        text,
        boardId
    }
}

export const deleteToDo = (id: number) => {
    return {
        type: DELETE,
        id
    }
}

export const updateToDo = (boardId: string, id: number, index: number, text: string) => {
    return {
        type: UPDATE,
        boardId,
        id,
        index,
        text
    }
}

export const dragTodo = ({draggableId, destination, source} : DropResult) => {
    return {
        type:DRAG,
        dragInfo: {draggableId, destination, source}
    }

}

const toDoReducer = (toDoState: IToDoState = { "To Do":[], Doing:[], Done:[], Idea:[]}, action: IStoreAction) : IToDoState => {
    switch (action.type) {
        case ADD:
            return { ...toDoState, [action.boardId] : [ ...toDoState[action.boardId], { id: Date.now(), text: action.text }]};
        case DELETE:
            let newToDoState = {} as IToDoState;
            Object.keys(toDoState).map(key => {
                let toDoList = toDoState[key];
                newToDoState = { ...newToDoState, [key]: toDoList.filter(todo => todo.id !== action.id) }
            })
            return newToDoState
        case UPDATE:
            const array = [...toDoState[action.boardId]];
            array[action.index] = { ...array[action.index], text: action.text}
            return { ...toDoState, [action.boardId]: array }
        case DRAG:
            const dragable = action.dragInfo;
            if (dragable.destination?.droppableId === dragable.source.droppableId) {
                const array = [...toDoState[dragable.source.droppableId]];
                const target = array[dragable.source.index];
                array.splice(dragable.source.index, 1);
                array.splice(dragable.destination.index, 0, target);
                return { ...toDoState, [dragable.source.droppableId]: array }
            } else if (!dragable.destination) {
                return { ...toDoState }
            } else {
                const sourceBoard = [...toDoState[dragable.source.droppableId]];
                const target = sourceBoard[dragable.source.index];
                const destinationBoard = [...toDoState[dragable.destination.droppableId]];
                sourceBoard.splice(dragable.source.index, 1);
                destinationBoard.splice(dragable.destination.index, 0, target);
                return { ...toDoState, [dragable.source.droppableId]: sourceBoard, [dragable.destination.droppableId]: destinationBoard };
            }
        default:
            return toDoState
    }
}

const toDoStore = configureStore({ reducer: toDoReducer });

export default toDoStore;




