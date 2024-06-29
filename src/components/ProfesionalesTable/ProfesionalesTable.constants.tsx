import { GridColDef } from '@mui/x-data-grid'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dayjs from 'dayjs';

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
    headerName: 'Fecha',
    renderCell: (params) => {
      const fechaHorario = params.row.horarios.length > 0 ? params.row.horarios[0] : null

      const formattedDate = fechaHorario ? dayjs(fechaHorario).format('DD/MM/YYYY') : ''

      return formattedDate
    }
  },
  {
    field: 'disponible',
    flex: 1,
    headerName: 'Disponible',
    renderCell: (params) => {
      const isDisponible = !!params.row.horarios.length

      return isDisponible ? <CheckCircleIcon color="success"/> : <RemoveCircleIcon color="error"/>
    }
  }
]