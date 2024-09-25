import { Typography, Input, Switch, Button, Alert, Box } from '@mui/material';
import { useState } from 'react';
import { postTask } from '../utils/APIService.jsx'

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
            setAlert({ message: 'Title cannot be empty.', type: "error" });
            return false;
        }
        if (!isDescriptionValid) {
            setAlert({ message: 'Description cannot be empty.', type: "error" });
            return false;
        }

        setAlert(null); 
        return true;
    };

    const handleSave = () => {
        postTask(task)
            .then(response => {
                if (response.status === 201) {
                    setAlert({message: "Task saved successfully!", type: "success"})
                }
            })
            .catch(error => {
                if (error.response) {
                    setAlert({ message: `Error: ${error.response.data}`, type: "error" });
                } else if (error.request) {
                    setAlert({ message: "Error: No response from the server", type: "error" });
                } else {
                    setAlert({ message: `Error: ${error.message}`, type: "error" });
                }
            });

        const timeoutId = setTimeout(() => {
            setAlert(null);
            onDataChange();
        }, 3000);
        return () => clearTimeout(timeoutId);
    }

    const isNullOrEmptyOrWhitespace = (value) => {
        return !value || value.trim().length === 0;
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
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