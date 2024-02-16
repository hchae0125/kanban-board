import { OutlinedInput } from '@mui/material';
import * as React from 'react';
import '../mainHeader.css';
import { connect } from 'react-redux';
import { filterTodo } from '../store';

interface IMainHeaderProps {
    dispatch: any;
}

const MainHeader: React.FC<IMainHeaderProps> = (props) => {

    return <>
    <div className='max-container'>
        <div className='title-container'>
            <h2 className='title'>Manage your tasks</h2>
        </div>
        <div className='search'>
            <OutlinedInput color="primary" placeholder='Go to any project or task'
                sx={{width: 400, height: '4vh'}}
                onChange={(e) => {
                    props.dispatch(filterTodo(e.target.value));
                }}
            />
        </div>
    </div>
    </>
}

function mapDispatchToProps(dispatch: any) {
    return { dispatch }
  }

export default connect(null, mapDispatchToProps)(MainHeader);