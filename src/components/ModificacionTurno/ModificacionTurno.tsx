import { useContext, useEffect, useState } from 'react'
import { AltaModificacionTurno } from '../AltaModificacionTurno/AltaModificacionTurno'
import { IFormInitialValues, Props } from './modificacion-turno'
import { ITurno } from '../../types'
import { TurnosAPI } from '../../api/turnos-api'
import { SnackbarContext } from '../../context/SnackbarContext'

export const ModificacionTurno: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)
  const { setOpen, setMessage} = useContext(SnackbarContext) 

  const handleUpdate = (turno: ITurno) => {    
    TurnosAPI.updateTurno(turno.id, turno)
      .then((updatedTurno) => {
        setOpen(true)
        setMessage('El turno se actualizó exitosamente')
      })
      .catch(error => {
        setOpen(true)
        setMessage('Error al actualizar turno')
      })
  }

  return (
      <AltaModificacionTurno
          handleCloseDialog={ handleCloseDialog }
          handleSubmit={ handleUpdate }
          initialFormValues={ initialFormValues }
          openDialog={ openDialog }
          title="Editar Turno"
          selectedIdRow={ selectedIdRow }
      />
  )
}
