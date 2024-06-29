import { GridColDef } from '@mui/x-data-grid'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
  },
  {
    field: 'disponible',
    flex: 1,
    headerName: 'Disponible',
    renderCell: (params) => {
      const isDisponible = params.row.socioID

      return !isDisponible ? <CheckCircleIcon color="success"/> : <RemoveCircleIcon color="error"/>
    }
  },
  {
    field: 'cancelado',
    flex: 1,
    headerName: 'Habilitado',
    renderCell: (params) => {
      const isCancelado = params.row.cancelado

      return !isCancelado ? <CheckCircleIcon color="success"/> : <RemoveCircleIcon color="error"/>
    }
  }
]