import { useState } from 'react'
import { AltaModificacionTurno } from '../AltaModificacionTurno/AltaModificacionTurno'
import { IFormInitialValues, Props } from './alta-turno'
import { ITurno } from '../../types'
import { TurnosAPI } from '../../api/turnos-api'

export const AltaTurno: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)

  const handleAdd = (turno: ITurno) => {    
    TurnosAPI.createTurno(turno)
      .then((turnoID) => console.log('Turno creado: ', turnoID));
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
