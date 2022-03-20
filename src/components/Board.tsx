import { Droppable } from "react-beautiful-dnd"
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  width: 300px;
  min-height: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  border-radius: 4px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IBoard {
    list: string[];
    boardId: string;
}

function Board ({list, boardId}: IBoard) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
                {(magic) => (
                <div ref={magic.innerRef} {...magic.droppableProps}>
                    {list.map((toDo, index) => (
                    <DraggableCard key={toDo} index={index} toDo={toDo} />
                    ))}
                    {magic.placeholder}
                </div>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;