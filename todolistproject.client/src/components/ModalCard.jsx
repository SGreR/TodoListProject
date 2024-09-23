import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

const ModalCard = ({ open, onClose, mode, row }) => {
    
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {mode}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {row && row.id + row.title + row.description + row.created }
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default ModalCard;