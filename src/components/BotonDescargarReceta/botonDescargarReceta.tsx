import React from 'react'
import { Button } from '@mui/material'
import { ITurno } from '../../types'
import { RecetasAPI } from '../../api/recetas-api'

interface BotonDescargarRecetaProps {
  turno: ITurno
  idUsuario: number | string
}

const BotonDescargarReceta: React.FC<BotonDescargarRecetaProps> = ({ turno, idUsuario }) => {
  const handleDownload = async () => {
    console.log('handleDownload called');
    console.log('turno:', turno);
    console.log('idUsuario:', idUsuario);
    try {
      const receta = await RecetasAPI.descargarReceta(turno.id, idUsuario)
      console.log('Receta descargada:', receta);
      const dataStr = JSON.stringify(receta, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `receta_${turno.id}.json`
      
      link.click()
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Error al descargar la receta:', error);
    }
  }

  return (
    <Button variant="contained" color="primary" onClick={handleDownload}>
      Descargar
    </Button>
  )
}

export default BotonDescargarReceta
