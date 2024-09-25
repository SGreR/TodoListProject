import { Toolbar, Typography, IconButton, Tooltip, Input, Button, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import ModalCard from './ModalCard';

function TaskTableToolbar({ onSearch, onDataChange }) {
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState({
        title: '',
        description: '',
        created: ''
    })
    const [visible, setVisible] = useState(false)

    const handleSearch = () => {
        onSearch(filters)
    }

    const handleClear = () => {

        const emptyFilter = {
            title: '',
            description: '',
            created: ''
        }
        setFilters(emptyFilter);
        onSearch(emptyFilter);
    }

    const handleChange = (event) => {
        const field = event.target.name
        const value = event.target.value
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value
        }))
    }

    const handleSave = () => {
        setOpen(false);
        onDataChange();
    }

    return (
        <>
            <Toolbar>
                <Button variant="contained" onClick={() => setOpen(true)}>Add</Button>
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Tasks
                </Typography>
                
                <Tooltip title="Filter list">
                    <IconButton onClick={() => setVisible(!visible)}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            {visible &&
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="body1">Filters:</Typography>
                    <Input
                        name="title"
                        placeholder="Task Name"
                        onChange={handleChange}
                        value={filters.title}
                    />
                    <Input
                        name="description"
                        placeholder="Task Description"
                        onChange={handleChange}
                        value={filters.description}
                    />
                    <Input
                        name="created"
                        placeholder="Created"
                        onChange={handleChange}
                        value={filters.created}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                        <Button variant="contained" onClick={handleSearch}>Search</Button>
                        <Button variant="outlined" onClick={handleClear}>Clear Filters</Button>
                    </Box>
                </Box>
            }
            <ModalCard open={open} onClose={() => setOpen(false)} mode={"Add"} onDataChange={handleSave} />
        </>
        
    )
}
export default TaskTableToolbar;