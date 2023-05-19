import { Button } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySweetAlert = () => {
  const SweetAlert = withReactContent(Swal);

  const handleClick = () => {
    SweetAlert.fire({
      title: '¡Alerta dulce!',
      text: 'Este es un mensaje de alerta dulce',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Mostrar Alerta
    </Button>
  );
};

export default MySweetAlert;