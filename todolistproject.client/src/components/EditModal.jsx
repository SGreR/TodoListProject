import { Typography, Input, Switch, Button, Alert, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { putTask } from '../utils/APIService';

function EditModal({ initialRow, onDataChange }) {
    const [row, setRow] = useState(initialRow)
    const [alert, setAlert] = useState(null);
    const [isTaskValid, setIsTaskValid] = useState(true);

    useEffect(() => {
        setRow(initialRow)
    }, [initialRow])

    const handleChange = (event) => {
        const field = event.target.name;
        const value = field === 'isCompleted' ? event.target.checked : event.target.value;

        setRow((prevRow) => {
            const updatedRow = { ...prevRow, [field]: value };
            setIsTaskValid(validateTask(updatedRow));
            return updatedRow;
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

    const isNullOrEmptyOrWhitespace = (value) => {
        return !value || value.trim().length === 0;
    }

    const handleUpdate = () => {
        putTask(row.id, row)
            .then(response => {
                if (response.status === 200) {
                    setAlert({ message: "Task updated successfully!", type: "success" })
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

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {alert && <Alert severity={alert.type }>{alert.message}</Alert>}
            <Typography id="modal-modal-title" variant="h4" component="h2">
                {'Editing Task'}
            </Typography>
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {row && 'Title:'}
            </Typography>
            <Input
                name="title"
                type="text"
                value={row.title}
                onChange={handleChange}
            />
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {row && 'Description:'}
            </Typography>
            <Input
                name="description"
                type="text"
                value={row.description}
                onChange={handleChange}
                multiline={true}
            />
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {row && 'Completed: '}
            </Typography>
            <Switch
                name="isCompleted"
                checked={row.isCompleted}
                onChange={handleChange}
            />
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {row && 'Created on: ' + row.userReadableDate}
            </Typography>
            <Button sx={{ width: 'fit-content' }} disabled={row === initialRow || !isTaskValid} color="primary" variant="contained" onClick={handleUpdate}>Save Changes</Button >
        </Box>
    )
}

export default EditModal;