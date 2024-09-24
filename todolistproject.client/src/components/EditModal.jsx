import { Typography, Input, Switch, Button, Alert, Box } from '@mui/material';
import { useEffect, useState } from 'react';

function EditModal({ initialRow, onDataChange }) {
    const [row, setRow] = useState(initialRow)
    const [alert, setAlert] = useState(null);
    const [isTaskValid, setIsTaskValid] = useState(true);

    useEffect(() => {
        setRow(initialRow)
    }, [initialRow])

    const handleChange = (event) => {
        const field = event.target.name;
        const value = field === 'completed' ? event.target.checked : event.target.value;

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

    const isNullOrEmptyOrWhitespace = (value) => {
        return !value || value.trim().length === 0;
    }

    const handleUpdate = () => {
        //API call to update
        console.log("Making PUT API call")
        onDataChange(); //inside response handling
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {alert && <Alert severity="error">{alert}</Alert>}
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
                name="completed"
                checked={row.completed}
                onChange={handleChange}
            />
            <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                {row && 'Created on: ' + row.created}
            </Typography>
            <Button sx={{ width: 'fit-content' }} disabled={row === initialRow || !isTaskValid} color="primary" variant="contained" onClick={handleUpdate}>Save Changes</Button >
        </Box>
    )
}

export default EditModal;