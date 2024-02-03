import { Draggable } from "react-beautiful-dnd";
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { log } from "console";

interface IDraggasbleCard {
    toDoText: string;
    toDoId: string;
    index: number;
    cardId: number;
}

function DraggableCard ({toDoText, toDoId, index}: IDraggasbleCard) {
    console.log(toDoText);
    console.log(toDoId);
    console.log(index);
    return (
        <Draggable draggableId={toDoId+''} index={index} key={toDoId}>
            {(provided) => <div className={'draggable-card ' + toDoId} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> 
                <div className="icon-container">
                    <EditIcon />
                    <DeleteIcon />
                </div>
                {toDoText} 
            </div>}
        </Draggable>
    )
}

export default React.memo(DraggableCard);