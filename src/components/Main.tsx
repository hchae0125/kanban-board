import * as React from 'react';
import MainBody from './MainBody';
import MainHeader from './MainHeader';

interface IMainProps {

}

const Main : React.FC<IMainProps> = (props) => {
    return <div className='main'>
        <div className='main-header'>
            <MainHeader />
        </div>
        <div className='main-body'>
            <MainBody />
        </div>
    </div>
}

export default Main;