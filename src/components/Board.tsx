import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
    overflow: hidden;
    //background-color: ${(props) => props.theme.boardColor};
    width: 300px;
    min-height: 100vh;
    padding: 16px 0px;
    border-radius: 4px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  //margin-bottom: 10px;
  font-size: 18px;
  
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

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
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
            <div style={{backgroundColor: "white", color: boardId === 'To Do' ? '#c23616' : boardId === 'Doing' ? '#00a8ff' : boardId === 'Done' ? '#4cd137' : '#7f8fa6', padding:'4px', marginBottom:'8px', borderRadius:'4px', borderBottom:`solid 4px ${boardId === 'To Do' ? '#c23616' : boardId === 'Doing' ? '#00a8ff' : boardId === 'Done' ? '#4cd137' : '#7f8fa6'}`}}>
                <Title>{boardId}</Title>
            </div>
            
            <Form onSubmit={handleSubmit(onValid)}>
                <input { ...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId} `}/>
            </Form>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => (
                <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={provided.innerRef} {...provided.droppableProps}>
                    {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                    ))}
                    {provided.placeholder}
                </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;