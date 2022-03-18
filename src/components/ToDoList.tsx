import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

export interface IToDo {
    id: number;
    text: string;
    category: Categories;
}

function ToDoList ()  {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    console.log(toDos);
    const handleSelect = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    }
    return <div>
        <h1>To Dos</h1>
        <hr />
        <select value={category} onInput={handleSelect}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
        </select>
        <CreateToDo />
        <hr />
        <ul>
            {toDos.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
            ))}
        </ul>
        
    </div>;
}


export default ToDoList;