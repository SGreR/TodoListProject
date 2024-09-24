import { Typography, Input, Switch, Button, Alert, Box } from '@mui/material';
import { useEffect, useState } from 'react';

function AddModal({ onDataChange }) {
    const [alert, setAlert] = useState(null);
    const [isTaskValid, setIsTaskValid] = useState(true);
    const [task, setTask] = useState({
        title: "Task Title",
        description: "Task Description",
        completed: false
    })

    const handleChange = (event) => {
        const field = event.target.name;
        const value = field === 'completed' ? event.target.checked : event.target.value;

        setTask((prevTask) => {
            const updatedTask = { ...prevTask, [field]: value };
            setIsTaskValid(validateTask(updatedTask));
            return updatedTask;
        });
    };

    const validateTask = (task) => {
        const isTitleValid = !isNullOrEmptyOrWhitespace(task.title);
        const isDescriptionValid = !isNullOrEmptyOrWhitespace(task.description);

        if (!isTitleValid) {
            setAlert('Title cannot be empty.');
            return false;
        }
        if (!isDescriptionValid) {
            setAlert('Description cannot be empty.');
            return false;
        }

        setAlert(null); 
        return true;
    };

    const handleSave = () => {
        //API call to update
        console.log("Making POST API call")
        onDataChange(); //inside response handling
    }

    const isNullOrEmptyOrWhitespace = (value) => {
        return !value || value.trim().length === 0;
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'} }>
            {alert && <Alert severity="error">{alert}</Alert>}
            <Typography id="modal-modal-title" variant="h4" component="h2">
                {'Adding Task'}
            </Typography>
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {'Title:'}
            </Typography>
            <Input
                name="title"
                type="text"
                value={task.title}
                onChange={handleChange}
            />
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {'Description:'}
            </Typography>
            <Input
                name="description"
                type="text"
                value={task.description}
                onChange={handleChange}
                multiline={true}
            />
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {'Completed: '}
            </Typography>
            <Switch
                name="completed"
                checked={task.completed}
                onChange={handleChange}
            />
            <Button sx={{ width: 'fit-content' }} disabled={!isTaskValid} color="primary" variant="contained" onClick={handleSave}>Save Changes</Button >
        </Box>
    )
}

export default AddModal;