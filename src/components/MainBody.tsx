import * as React from 'react';
import BoardContainer from './BoardContainer';

interface IMainBodyProps {

}

const MainBody: React.FC<IMainBodyProps> = (props) => {
    return <>
        <div className='title-container'>
            <div className='title'>
                Kanban Board
            </div>
            <div className='action-button-container'>
                <div className='new-task-button'></div>
                <div className='view-button'></div>
            </div>
        </div>
        <div className='board-container'>
            <BoardContainer />
        </div>
    </>
}

export default MainBody;