import { Droppable } from "react-beautiful-dnd"
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
    overflow: hidden;
  background-color: ${(props) => props.theme.boardColor};
  width: 300px;
  min-height: 300px;
  padding-top: 10px;
  border-radius: 4px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IAreaProps {
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${props => props.isDraggingOver ? '#ffeaa7' : props.draggingFromThisWith ? '#a29bfe' : '#636e72'};
    flex-grow: 1;
    transition: background-color 300ms ease-in-out;
    padding: 20px;
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
            <Title>{boardId}</Title>
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