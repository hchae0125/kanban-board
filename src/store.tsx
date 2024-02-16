import { DropResult } from 'react-beautiful-dnd';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

const ADD = "ADD";
const DELETE = 'DELETE';
const UPDATE = "UPDATE";
const DRAG = "DRAG";
const FILTER = 'FILTER';

interface IStoreAction {
    type: string;
    text: string;
    boardId: string;
    id: number;
    index: number;
    dragInfo: DropResult
}

export interface IStoreState {
    [key: string] : IToDoState | null;
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

export const filterTodo = (text: string) => {
    return {
        type:FILTER,
        text
    }

}
const state : IStoreState = {
    "Original": { "To Do":[], Doing:[], Done:[], Idea:[]}, 
    "Filtered": null
}


const toDoReducer = (storeState: IStoreState = state, action: IStoreAction) : IStoreState => {
    const toDoState = storeState['Original'];
    switch (action.type) {
        case ADD:
            if (toDoState == null) return { ...storeState }
            return {...storeState, 'Original': { ...toDoState, [action.boardId] : [ ...toDoState[action.boardId], { id: Date.now(), text: action.text }]}};

        case DELETE:
            if (toDoState == null) return { ...storeState }
            let newToDoState = {} as IToDoState;
            Object.keys(toDoState).map(key => {
                let toDoList = toDoState[key];
                newToDoState = { ...newToDoState, [key]: toDoList.filter(todo => todo.id !== action.id) }
            })
            return {...storeState, 'Original': newToDoState}
        case UPDATE:
            if (toDoState == null) return { ...storeState }
            const array = [...toDoState[action.boardId]];
            array[action.index] = { ...array[action.index], text: action.text}
            return {...storeState, 'Original': { ...toDoState, [action.boardId]: array }}
        case DRAG:
            if (toDoState == null) return { ...storeState }
            const dragable = action.dragInfo;
            if (dragable.destination?.droppableId === dragable.source.droppableId) {
                const array = [...toDoState[dragable.source.droppableId]];
                const target = array[dragable.source.index];
                array.splice(dragable.source.index, 1);
                array.splice(dragable.destination.index, 0, target);
                return {...storeState, 'Original': { ...toDoState, [dragable.source.droppableId]: array }}
            } else if (!dragable.destination) {
                return { ...storeState }
            } else {
                const sourceBoard = [...toDoState[dragable.source.droppableId]];
                const target = sourceBoard[dragable.source.index];
                const destinationBoard = [...toDoState[dragable.destination.droppableId]];
                sourceBoard.splice(dragable.source.index, 1);
                destinationBoard.splice(dragable.destination.index, 0, target);
                return {...storeState, 'Original': { ...toDoState, [dragable.source.droppableId]: sourceBoard, [dragable.destination.droppableId]: destinationBoard }};
            }
        case FILTER:
            if (toDoState == null) return { ...storeState }
            if (action.text == '') {
                return { ...storeState, 'Filtered': null }
            } else {
                let filteredToDo = {} as IToDoState;
                Object.keys(toDoState).map(key => {
                    filteredToDo = { ...filteredToDo, [key]: toDoState[key].filter(todo => todo.text.indexOf(action.text) > -1) }
                });
                return { ...storeState, 'Filtered': filteredToDo}
            }
        default:
            return storeState
    }
}

const toDoStore = configureStore({ reducer: toDoReducer });

export default toDoStore;




