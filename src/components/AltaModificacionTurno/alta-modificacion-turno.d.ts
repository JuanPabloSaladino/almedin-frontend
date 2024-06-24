import { ITurno } from '../../types'
import { Dayjs } from 'dayjs'

export interface IFormInitialValues {
  socioID: string
  profesionalID: number
  fechaTurno: Dayjs | null
  motivoDeConsultaTurno: string
  id: number
}

export interface Props {
  title: string
  initialFormValues?: IFormInitialValues
  handleCloseDialog: () => void
  handleSubmit: (turno: ITurno) => void
  openDialog: boolean
  setFieldValue?: (field: string, value) => void,
  selectedIdRow?: string
}