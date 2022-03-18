import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { Categories, toDoState } from "../atoms";
import { IToDo } from "./ToDoList";

function ToDo ({text, category, id}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {
            name
        }} = event;
        setToDos((todos) => {
            const targetIndex = todos.findIndex(x => x.id === id);
            if (targetIndex > -1) {
                const updatedToDos: IToDo[] = [ ...todos.slice(0, targetIndex),
                    {text, id, category: name as any},
                    ...todos.slice(targetIndex + 1)];
                return updatedToDos;
            } else {
                return todos;
            }
        });
    }
    return <li>
        <span>{text}</span>
        <button name={Categories.DOING} hidden={category === Categories.DOING} onClick={handleOnClick}>DOING</button>
        <button name={Categories.TO_DO} hidden={category === Categories.TO_DO} onClick={handleOnClick}>To Do</button>
        <button name={Categories.DONE}  hidden={category === Categories.DONE}onClick={handleOnClick}>Done</button>
    </li>;
}

export default ToDo;