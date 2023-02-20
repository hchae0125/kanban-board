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

const TitleBox = styled.div<{boardId : string}>`
    background-color: white;
    color: ${(props) => props.boardId === 'To Do' ? '#c23616' : props.boardId === 'Doing' ? '#00a8ff' : props.boardId === 'Done' ? '#4cd137' : '#7f8fa6'};
    border-bottom: solid 4px ${(props) => props.boardId === 'To Do' ? '#c23616' : props.boardId === 'Doing' ? '#00a8ff' : props.boardId === 'Done' ? '#4cd137' : '#7f8fa6'};
    border-radius: 4px;
    margin-bottom: 8px;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const OptionIcon = styled.button`
    :hover {
        color: darkgray;
    }
    margin: 4px;
    color: silver;
    border: 0;
    background-color: transparent;
`;

const Text = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
`;

const Count = styled.div<{boardId: string}>`
    color: ${(props) => props.boardId === 'To Do' ? '#c23616' : props.boardId === 'Doing' ? '#00a8ff' : props.boardId === 'Done' ? '#4cd137' : '#7f8fa6'};
    margin: 4px;
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
            <TitleBox boardId={boardId}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <OptionIcon><MoreVertIcon /></OptionIcon>
                    <Text>{boardId}</Text>
                </div>
                <Count boardId={boardId}>{toDos.length}</Count>
            </TitleBox>
            
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