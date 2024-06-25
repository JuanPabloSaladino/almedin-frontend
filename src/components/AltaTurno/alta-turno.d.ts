import { Dayjs } from 'dayjs'

export interface Props {
  openDialog: boolean
  selectedIdRow: string
  handleCloseDialog: () => void
  title: string
}

export interface IFormInitialValues {
  socioID: string
  profesionalID: number
  nombreSocio: string
  fechaTurno: Dayjs | null
  motivoDeConsultaTurno: string
  id: number
}