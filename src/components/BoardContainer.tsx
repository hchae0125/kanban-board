import * as React from 'react';
import Board from './Board';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from '../atoms';
import '../mainBody.css';

interface IBoardContainer {

}


const BoardContainer: React.FC<IBoardContainer> = (props) => {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = ({draggableId, destination, source} : DropResult) => {
      if (!destination) return;
      if (destination?.droppableId === source.droppableId) {
        setToDos((prev) => {
          const array = [...prev[source.droppableId]];
          const target = array[source.index];
          array.splice(source.index, 1);
          array.splice(destination.index, 0, target);
          return { ...prev, [source.droppableId]: array }
        });
      } else {
        setToDos((prev) => {
          const sourceBoard = [...prev[source.droppableId]];
          const target = sourceBoard[source.index];
          const destinationBoard = [...prev[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBoard.splice(destination.index, 0, target);
          return { ...prev, [source.droppableId]: sourceBoard, [destination.droppableId]: destinationBoard };
        });
      }
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

export default BoardContainer;