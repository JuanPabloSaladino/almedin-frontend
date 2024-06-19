import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'nombreSocio',
    flex: 3,
    headerName: 'Socio',
  },
  {
    field: 'nombreProfesional',
    flex: 3,
    headerName: 'Profesional',
  },
  {
    field: 'motivoDeConsultaTurno',
    flex: 3,
    headerName: 'Motivo de consulta',
  },
  {
    field: 'fechaTurno',
    flex: 2,
    headerName: 'Fecha',
  }
]