import { Draggable } from "react-beautiful-dnd";
import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { connect } from "react-redux";
import { deleteToDo, updateToDo } from "../store";
import { TextField } from "@mui/material";

interface IDraggasbleCard {
    toDoText: string;
    toDoId: string;
    index: number;
    cardId: number;
    dispatch: any;
}

function DraggableCard ({toDoText, toDoId, index, cardId, dispatch}: IDraggasbleCard) {
    const handleDelete = (cardId: number) => {
        dispatch(deleteToDo(cardId));
    }

    const [inputDisabled, setInputDisabled] = React.useState<boolean>(true);
    const handleUpdate = (cardId: number) => {
        setInputDisabled(!inputDisabled);
    }
    
    return (
        <Draggable draggableId={cardId+''} index={index} key={cardId}>
            {(provided) => <div className={'draggable-card ' + toDoId} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}> 
                <div className="draggable-card-icon-container">
                    <button className="draggable-card-button" onClick={() => {
                        handleUpdate(cardId);
                    }}>
                        <EditIcon className="draggable-card-icon" />
                    </button>
                    <button className="draggable-card-button" onClick={() => {
                        handleDelete(cardId);
                    }}><DeleteIcon className="draggable-card-icon" /></button>
                </div>
                <TextField
                    disabled={inputDisabled}
                    id="filled-multiline-flexible"
                    multiline
                    fullWidth 
                    maxRows={4}
                    variant="filled"
                    value={toDoText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        dispatch(updateToDo(toDoId, cardId, index, event.target.value));
                    }}
                />
            </div>}
        </Draggable>
    )
}

function mapDispatchToProps(dispatch: any) {
    return { dispatch }
}

export default connect(null,mapDispatchToProps) (React.memo(DraggableCard));