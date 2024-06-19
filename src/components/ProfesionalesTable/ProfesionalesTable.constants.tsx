import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'nombreMedico',
    flex: 3,
    headerName: 'Nombre',
  },
  {
    field: 'especialidad',
    flex: 3,
    headerName: 'Especialidad',
  },
  {
    field: 'ubicacion',
    flex: 3,
    headerName: 'Ubicación',
  },
  {
    field: 'horarios',
    flex: 2,
    headerName: 'Horarios',
  }
]