import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dayjs from 'dayjs';

const renderDate = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
  const fechaHorario = params.row.fechaTurno ? params.row.fechaTurno : null;
  const formattedDate = fechaHorario ? dayjs(fechaHorario).format('DD/MM/YYYY') : '';
  
  return formattedDate;
};

const renderIcon = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>, condition: boolean) => {
  return condition ? <RemoveCircleIcon color="error" /> : <CheckCircleIcon color="success" />;
};

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
    renderCell: (params) => renderDate(params),
  },
  {
    field: 'disponible',
    flex: 1,
    headerName: 'Disponible',
    renderCell: (params) => renderIcon(params, !params.row.socioID),
  },
  {
    field: 'cancelado',
    flex: 1,
    headerName: 'Habilitado',
    renderCell: (params) => renderIcon(params, params.row.cancelado),
  },
];