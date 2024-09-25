import { Typography, Box } from '@mui/material';

function DetailsModal({ row }) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
                {'Task Details'}
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
        </Box>
    
  );
}

export default DetailsModal;