import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { RecetasAPI } from '../../api/recetas-api'
import jsPDF from 'jspdf'
import { SnackbarContext } from '../../context/SnackbarContext'
import { BotonDescargarRecetaProps } from './boton-descargar-receta'

const BotonDescargarReceta: React.FC<BotonDescargarRecetaProps> = ({ turno, idUsuario }) => {
  const { setOpen, setMessage} = useContext(SnackbarContext) 

  const handleDownload = async () => {
    try {
      const receta = await RecetasAPI.descargarReceta(turno.id, idUsuario)
      console.log('Receta descargada:', receta);

      const doc = new jsPDF();

      doc.text(`Receta para turno ${turno.id}`, 10, 10)
      doc.text(JSON.stringify(receta, null, 2), 10, 20)

      doc.save(`receta_${turno.id}.pdf`);
    } catch (error: any) {
      console.error('Error al descargar la receta:', error)
      
      if (error.response && error.response.status === 500) {
        setOpen(true)
        setMessage('No hay receta asociada al turno seleccionado')
      }
    }
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDownload}>
        Descargar
      </Button>
    </>
  )
}

export default BotonDescargarReceta
