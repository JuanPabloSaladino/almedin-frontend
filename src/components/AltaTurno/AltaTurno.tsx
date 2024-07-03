import { useContext, useState } from 'react'
import { AltaModificacionTurno } from '../AltaModificacionTurno/AltaModificacionTurno'
import { IFormInitialValues, Props } from './alta-turno'
import { ITurno } from '../../types'
import { TurnosAPI } from '../../api/turnos-api'
import { SnackbarContext } from '../../context/SnackbarContext'

export const AltaTurno: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)
  const { setOpen, setMessage} = useContext(SnackbarContext) 

  const handleAdd = (turno: ITurno) => {    
    TurnosAPI.createTurno(turno)
      .then((turnoID) => {
        setOpen(true)
        setMessage('El turno se creo exitosamente')
      })
      .catch(error => {
        setOpen(true)
        setMessage('Error al crear turno')
      })
  }

  return (
      <AltaModificacionTurno
          handleCloseDialog={ handleCloseDialog }
          handleSubmit={ handleAdd }
          initialFormValues={ initialFormValues }
          openDialog={ openDialog }
          title="Agregar Turno"
          selectedIdRow={ selectedIdRow }
      />
  )
}
