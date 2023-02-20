import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 4px;
  border-radius: 4px;
  padding: 10px ;
`;

interface IDraggasbleCard {
    toDoText: string;
    toDoId: number;
    index: number;
}

function DraggableCard ({toDoText, toDoId, index}: IDraggasbleCard) {
    return (
        <Draggable draggableId={toDoId+''} index={index} key={toDoId}>
            {(provided) => <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> 
                <div className="icon-container"><EditIcon /><DeleteIcon /></div>
                {toDoText} 
            </Card>}
        </Draggable>
    )
}

export default React.memo(DraggableCard);