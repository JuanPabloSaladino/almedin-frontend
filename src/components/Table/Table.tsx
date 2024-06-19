import { DataGrid } from '@mui/x-data-grid'
import { columns } from './Table.constants'
import * as React from 'react'
import { IEspecialista } from '../../types'

export interface Props {
  rows: IEspecialista[]
}

export const Table: React.FC<Props> = ({ rows }) => {

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