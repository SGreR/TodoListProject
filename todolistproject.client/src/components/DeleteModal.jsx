import { Typography, Button, Modal, Box, Alert } from '@mui/material';
import { useState } from 'react';
import { deleteTaskById } from '../utils/APIService.jsx'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function DeleteModal({ row, onDataChange }) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    const confirmDelete = (id) => {
        setOpen(false);
        deleteTaskById(id)
            .then(response => {
                if (response.status === 204) {
                    setAlert({ message: "Task deleted successfully!", type: "success" })
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
          {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
          <Typography id="modal-modal-title" variant="h4" component="h2">
              {'Deleting Task'}
          </Typography>
          <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
              {row && 'Title: ' + row.title}
          </Typography>
          <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
              {row && 'Description: ' + row.description}
          </Typography>
          <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
              {row && 'Completed: '}
              {row.isCompleted ? 'Yes' : 'No'}
          </Typography>
          <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
              {row && 'Created on: ' + row.userReadableDate}
          </Typography>
          <Button sx={{ width: '40%' }} color="warning" variant="contained" onClick={() => setOpen(true)}>Delete</Button>
          <Modal
              open={open}
              onClose={() => setOpen(false)}
          >
              <Box sx={style}>
                  <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
                      Are you sure you want to delete this item?
                  </Typography>
                  <Button sx={{ width: '40%' }} color="warning" variant="contained" onClick={() => confirmDelete(row.id)}>Delete</Button>
                  <Button sx={{ width: '40%' }} color="primary" onClick={() => setOpen(false)}>Cancel</Button>
              </Box>
          </Modal>
      </Box>
  );
}

export default DeleteModal;