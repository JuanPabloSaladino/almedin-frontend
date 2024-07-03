import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { ClickAwayListener, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import { TableButton } from '../TableButton/TableButton'
import * as React from 'react'
import { ITurno } from '../../types'
import { columns } from '../TurnosTable/TurnosTable.constants'
import { useState, useContext } from 'react' 
import { ModificacionTurno } from '../ModificacionTurno/ModificacionTurno'
import { AltaTurno } from '../AltaTurno/AltaTurno'
import  BotonDescargarReceta  from "../BotonDescargarReceta/botonDescargarReceta"
import { AppContext } from "../../context/AppContext"



export interface Props {
  rows: ITurno[]
}

export const TurnosTable: React.FC<Props> = ({ rows }) => {
  const [selectedIdRow, setSelectedIdRow] = useState<string>('');
  const { user } = useContext(AppContext);

  const handleSelectionModelChange = (selection: GridRowSelectionModel) => {
    const selectedId = (selection[0] as number).toString()
    setSelectedIdRow(selectedId)
  }

  const handleClickAway = () => {
    setSelectedIdRow('')
  }

  let idUser = (user) ? user.idUsuario:"es un error perro en la linea 34 TurnosTable" ;


  return (
    <>
      <ClickAwayListener onClickAway={ handleClickAway }>
        <div>
          <Grid
              container
              marginBottom={ 1 }
              marginTop={ 5 }
              spacing={ 1 }
          >
            <Grid item>
              <TableButton
                color="success"
                onClose={ () => setSelectedIdRow('') }
                modal={ AltaTurno }
                selectedIdRow={ selectedIdRow }
              >
                <AddIcon color={ 'success' }/>
              </TableButton>
            </Grid>
            <Grid item>
              <TableButton
                color="warning"
                disabled={ !selectedIdRow }
                onClose={ () => setSelectedIdRow('') }
                modal={ ModificacionTurno }
                selectedIdRow={ selectedIdRow }
              >
                <EditIcon color={ !selectedIdRow ? 'disabled' : 'warning' }/>
              </TableButton>
            </Grid>
          </Grid>
          <DataGrid
            autoHeight
            rows={ rows }
            columns={[
              ...columns,
              {
                field: 'descargar',
                headerName: 'Descargar',
                flex: 1,
                renderCell: (params) => (
                  <BotonDescargarReceta turno={params.row} idUsuario={idUser} />
                ),
              },
            ]}





            initialState={ {
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            } }
            pageSizeOptions={[5, 10, 25]}
            onRowSelectionModelChange={ handleSelectionModelChange }
            localeText={ {
              footerRowSelected: () => ''
            } }
            sx={ {
              boxShadow: 2,
              '& .MuiDataGrid-cell:hover': {
                cursor: 'pointer'
              }
            } }
          />
        </div>
      </ClickAwayListener>
    </>
  )
}