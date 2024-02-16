import * as React from 'react';
import BoardContainer from './BoardContainer';

interface IMainBodyProps {

}

const MainBody: React.FC<IMainBodyProps> = (props) => {
    return <>
        <div className='board-container'>
            <BoardContainer />
        </div>
    </>
}

export default MainBody;