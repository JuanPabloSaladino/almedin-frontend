import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material'
import { ITurno } from '../../types'
import { RecetasAPI } from '../../api/recetas-api'
import MuiAlert, { AlertProps } from '@mui/material/Alert';


interface BotonDescargarRecetaProps {
  turno: ITurno
  idUsuario: number | string
}

const BotonDescargarReceta: React.FC<BotonDescargarRecetaProps> = ({ turno, idUsuario }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
  
    const handleDownload = async () => {
      console.log('handleDownload called');
      console.log('turno:', turno);
      console.log('idUsuario:', idUsuario);
      try {
        const receta = await RecetasAPI.descargarReceta(turno.id, idUsuario);
        console.log('Receta descargada:', receta);
        const dataStr = JSON.stringify(receta, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `receta_${turno.id}.json`;
        
        link.click();
        URL.revokeObjectURL(url);
        
      } catch (error: any) { // para tipar el error  pq sino tira error
        console.error('Error al descargar la receta:', error);
        if (error.response && error.response.status === 500) {
          setSnackbarMessage('NO HAY NINGUNA RECETA DISPONIBLE EN ESTE TURNO');
          setOpenSnackbar(true);
        }
      }
    }
  
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  
    return (
      <>
        <Button variant="contained" color="primary" onClick={handleDownload}>
          Descargar
        </Button>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </>
    );
  }
  
  export default BotonDescargarReceta;