import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  {
    field: 'nombreMedico',
    flex: 4,
    headerName: 'Nombre',
  },
  {
    field: 'especialidad',
    flex: 5,
    headerName: 'Especialidad',
  },
  {
    field: 'ubicacion',
    flex: 3,
    headerName: 'Ubicación',
  },
  {
    field: 'horarios',
    flex: 3,
    headerName: 'Horarios',
  }
]