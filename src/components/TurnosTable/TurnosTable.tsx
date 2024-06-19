import { DataGrid } from '@mui/x-data-grid'
import * as React from 'react'
import { ITurno } from '../../types'
import { columns } from '../TurnosTable/TurnosTable.constants'

export interface Props {
  rows: ITurno[]
}

export const TurnosTable: React.FC<Props> = ({ rows }) => {

  return (
    <>
      <div>
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
    </>
  )
}