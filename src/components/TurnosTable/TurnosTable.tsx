import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { ClickAwayListener, Grid } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add';
import { TableButton } from '../TableButton/TableButton'
import * as React from 'react'
import { ITurno } from '../../types'
import { columns } from '../TurnosTable/TurnosTable.constants'
import { useState } from 'react'
import { ModificacionTurno } from '../ModificacionTurno/ModificacionTurno'
import { AltaTurno } from '../AltaTurno/AltaTurno'

export interface Props {
  rows: ITurno[]
}

export const TurnosTable: React.FC<Props> = ({ rows }) => {
  const [selectedIdRow, setSelectedIdRow] = useState<string>('')

  const handleSelectionModelChange = (selection: GridRowSelectionModel) => {
    const selectedId = (selection[0] as number).toString()
    setSelectedIdRow(selectedId)
  }

  const handleClickAway = () => {
    setSelectedIdRow('')
  }

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
            columns={ columns }
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