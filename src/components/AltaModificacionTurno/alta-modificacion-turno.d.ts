import { ITurno } from '../../types'

export interface IFormInitialValues {
  socioID: string
  nombreSocio: string
  fechaTurno: string
  nombreProfesional: string
  motivoDeConsultaTurno: string
  ID: string
}

export interface Props {
  title: string
  initialFormValues?: IFormInitialValues
  handleCloseDialog: () => void
  handleSubmit: (turno: ITurno) => void
  openDialog: boolean
  setFieldValue?: (field: string, value) => void
}