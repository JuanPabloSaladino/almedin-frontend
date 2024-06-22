import { Dayjs } from 'dayjs'

export interface Props {
  openDialog: boolean
  selectedIdRow: string
  handleCloseDialog: () => void
  title: string
}

export interface IFormInitialValues {
  socioID: string
  nombreSocio: string
  fechaTurno: string
  nombreProfesional: string
  motivoDeConsultaTurno: string
  ID: string
}