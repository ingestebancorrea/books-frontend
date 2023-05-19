import React, { useState } from 'react';
import { Modal, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useModal = () => {
  const [open, setOpen] = useState(false);//Controlar apertura y cierre de modal

  const { status } = useSelector( state => state.auth );

  const navigate = useNavigate();

  //Funciones para abrir y cerrar modal
  const handleOpen = () => {
    if(status==='authenticated'){
      setOpen(true);
    }else{
      navigate('/auth/login');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ModalComponent = ({ children }) => (
    <Modal
      open={open}
      onClose={handleClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 620, bgcolor: 'background.paper', p: 2 }}>
        {children}
      </Box>
    </Modal>
  );

  return { handleOpen, handleClose, ModalComponent };
};

export default useModal;