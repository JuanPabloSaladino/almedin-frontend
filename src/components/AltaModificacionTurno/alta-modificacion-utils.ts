import { FormikConfig } from 'formik'
import { initialValues } from './AltaModificacionTurno.constants'
import { IFormInitialValues } from './alta-modificacion-turno'
import { TurnosAPI } from '../../api/turnos-api'

export const getFormikProps = (
  handleSubmitData: (values: any) => void,
  setTurnos: (turnos: any) => void,
  setOpen: (open: boolean) => void,
  setMessage: (message: string) => void,
  handleCloseDialog: () => void,
  initialFormValues: any
): FormikConfig<IFormInitialValues> => {
  return {
    enableReinitialize: true,
    initialValues: { ...initialValues, ...initialFormValues },
    onSubmit: async (values: any, { setFieldError }: { setFieldError: (field: string, message: string) => void }) => {
      if (!values.fechaTurno) {
        setFieldError('fechaTurno', 'Debe seleccionar una fecha de turno')
        return
      }

      handleSubmitData(values)

      try {
        const turnos = await TurnosAPI.getTurnos()
        setTurnos(turnos)
      } catch (error) {
        setOpen(true)
        setMessage('Error al obtener turnos')
      }

      handleCloseDialog()
    }
  }
}
