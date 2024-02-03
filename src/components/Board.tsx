import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Wrapper = styled.div`
    overflow: hidden;
    width: 300px;
    min-height: 100vh;
    padding: 16px 0px;
    border-radius: 4px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? '#ffeaa7' : props.draggingFromThisWith ? '#a29bfe' : props.theme.bgColor};
    flex-grow: 1;
    transition: background-color 300ms ease-in-out;
    padding: 8px 0px;
    border-radius: 0%;
`;
interface IBoard {
    toDos: ITodo[];
    boardId: string;
}

interface IForm {
    toDo: string;
}

function Board ({toDos, boardId}: IBoard) {
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [
                    ...allBoards[boardId],
                    newToDo
                ]
            }
        })
        setValue("toDo", '');
    }

    return (
        <Wrapper>
            <div className={'board-top-container ' + (boardId)}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button className="board-top-option"><MoreVertIcon /></button>
                    <h2 className="board-top-title">{boardId}</h2>
                </div>
                <div className={'board-top-count'}>
                    {toDos.length}
                </div>
            </div>
            
            <form className="board-top-form" onSubmit={handleSubmit(onValid)}>
                <input { ...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId} `}/>
            </form>

            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
                    {toDos.map((toDo, index) => (
                        <DraggableCard key={toDo.id} index={index} toDoId={provided.droppableProps["data-rbd-droppable-id"]} cardId={toDo.id} toDoText={toDo.text} />
                    ))}
                    {provided.placeholder}
                </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;