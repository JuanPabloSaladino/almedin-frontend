import { useEffect, useState } from 'react'
import { AltaModificacionTurno } from '../AltaModificacionTurno/AltaModificacionTurno'
import { IFormInitialValues, Props } from './modificacion-turno'
import { ITurno } from '../../types'
import { TurnosAPI } from '../../api/turnos-api'

export const ModificacionTurno: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)

  const handleUpdate = async(turno: ITurno) => {
    console.log('handleUpdate')
    console.log('turno: ', turno)

    //const turnoToUpdate = await TurnosAPI.getTurnoByID(selectedIdRow)

    //console.log('turnoToUpdate', turnoToUpdate)

    if(turno) {
      console.log('turno id', turno.ID, ' turno: ', turno)


        TurnosAPI
            .updateTurno(selectedIdRow, turno)
            .then((updatedTurno) => console.log('Turno actualizado',updatedTurno))
    }
  }

  useEffect(() => {
    if (selectedIdRow) {

      /*
      * TODO:
      *  - El ID del bug no es el selectedIdRow. Solucionar.
      *  - Si está el selectedIdRow (ID del bug), pegarle a la API
      *  (método HTTP GET) para traerme el Bug correspondiente
      *  - Luego, popular el formulario con esa información
      * */

      //const turno: ITurno | undefined = getTurnoByID(selectedIdRow)

      //if (turno) {
      //  setInitialFormValues(turno)
      //}
    }
  }, [selectedIdRow])

  return (
      <AltaModificacionTurno
          handleCloseDialog={ handleCloseDialog }
          handleSubmit={ handleUpdate }
          initialFormValues={ initialFormValues }
          openDialog={ openDialog }
          title="Editar Turno"
      />
  )
}
