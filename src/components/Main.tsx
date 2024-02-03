import * as React from 'react';
import MainBody from './MainBody';
import MainHeader from './MainHeader';
import '../main.css';

interface IMainProps {

}

const Main : React.FC<IMainProps> = (props) => {
    return <div className='main'>
        <section id='main-header'>
            <MainHeader />
        </section>
        <section id='main-body'>
            <MainBody />
        </section>
    </div>
}

export default Main;