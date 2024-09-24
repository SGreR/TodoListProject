import { Typography, Button, Modal, Box } from '@mui/material';
import { useState } from 'react';

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

    const confirmDelete = () => {
        //Send API Delete call
        console.log("sending API delete call");
        onDataChange();
    }

  return (
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
              {row.completed ? 'Yes' : 'No'}
          </Typography>
          <Typography id="modal-modal-description" variant="body1" sx={{ mt: 2 }}>
              {row && 'Created on: ' + row.created}
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
                  <Button sx={{ width: '40%' }} color="warning" variant="contained" onClick={confirmDelete}>Delete</Button>
                  <Button sx={{ width: '40%' }} color="primary" onClick={() => setOpen(false)}>Cancel</Button>
              </Box>
          </Modal>
      </Box>
  );
}

export default DeleteModal;