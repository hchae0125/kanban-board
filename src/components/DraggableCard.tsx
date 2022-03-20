import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import * as React from 'react';

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 4px;
  border-radius: 4px;
  padding: 10px ;
`;

interface IDraggasbleCard {
    toDo: string;
    index: number;
}

function DraggableCard ({toDo, index}: IDraggasbleCard) {
    return (
        <Draggable draggableId={toDo} index={index} key={toDo}>
            {(provided) => <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> 
                {toDo}
            </Card>}
        </Draggable>
    )
}

export default React.memo(DraggableCard);