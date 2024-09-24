import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DetailsModal from './DetailsModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';

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

const ModalCard = ({ open, onClose, mode, row, onDataChange }) => {
    
    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
            >
                <Box sx={style}>
                    {mode === "Add" && <AddModal onDataChange={onDataChange} />}
                    {mode === "Details" && <DetailsModal row={row} />}
                    {mode === "Edit" && <EditModal initialRow={row} onDataChange={onDataChange} />}
                    {mode === "Delete" && <DeleteModal row={row} onDataChange={onDataChange} />}
                </Box>
            </Modal>
        </>
    );
}

export default ModalCard;