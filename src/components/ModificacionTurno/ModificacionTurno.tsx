import { useEffect, useState } from 'react'
import { AltaModificacionTurno } from '../AltaModificacionTurno/AltaModificacionTurno'
import { IFormInitialValues, Props } from './modificacion-turno'
import { ITurno } from '../../types'
import { TurnosAPI } from '../../api/turnos-api'
import dayjs from 'dayjs'

export const ModificacionTurno: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)

  useEffect(( ) => {
    console.log('Hola')
  }, [])

  const handleUpdate = (turno: ITurno) => {    
    TurnosAPI.updateTurno(turno.id, turno)
      .then((updatedTurno) => console.log('Turno actualizado: ', updatedTurno));
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
