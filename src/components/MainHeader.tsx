import { OutlinedInput } from '@mui/material';
import * as React from 'react';
import '../mainHeader.css';

interface IMainHeaderProps {

}

const MainHeader: React.FC<IMainHeaderProps> = (props) => {

    const handleOnChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  
    }

    return <>
    <div className='max-container'>
        <div className='title-container'>
            <h2 className='title'>Manage your tasks</h2>
        </div>
        <div className='search'>
            <OutlinedInput color="primary" placeholder='Go to any project or task'
                sx={{width: 400, height: '4vh'}}
                onChange={(e) => {
                    handleOnChange(e);
                }}
            />
        </div>
    </div>
    </>
}

export default MainHeader;