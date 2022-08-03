import { IconButton, InputBase, Paper, TextField } from '@mui/material';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface IMainHeaderProps {

}

const MainHeader: React.FC<IMainHeaderProps> = (props) => {
    return <>
        <div className='search'>
            <Paper component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, boxShadow: 'none', border: 'solid 1px darkgray', height: '4vh' }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Go to any project or task"
                    inputProps={{ 'aria-label': 'search tasks' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
        <div className='dropdown-container'>
            <div className='dropdown'>
                Group By
            </div>
            <div className='dropdown'>
                dropdown 2
            </div>
        </div>
    </>
}

export default MainHeader;