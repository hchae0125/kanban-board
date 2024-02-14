import * as React from 'react';
import Board from './Board';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import '../mainBody.css';
import { connect } from 'react-redux';
import { dragTodo, IToDoState } from '../store';

interface IBoardContainer {
  toDoState: IToDoState;
  dispatch: any;
}


const BoardContainer: React.FC<IBoardContainer> = (props) => {
    const toDos = props.toDoState;
    const onDragEnd = ({draggableId, destination, source} : DropResult) => {
      if (!destination) return;
      props.dispatch(dragTodo({draggableId, destination, source} as DropResult));
    };

    return <>
        <DragDropContext onDragEnd={onDragEnd}>
            <div className='wrapper'>
                <div className='board-wrapper'>
                    {Object.keys(toDos).map(key => (
                        <Board toDos={toDos[key]} key={key} boardId={key} />
                    ))}
                </div>
            </div>
        </DragDropContext>
    </>
}

function mapStateToProps(state: any) {
  return { toDoState: state, filteredToDoState: state }
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch }
}

export default connect(mapStateToProps,mapDispatchToProps) (BoardContainer);