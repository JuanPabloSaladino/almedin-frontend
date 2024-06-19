import { Button } from '@mui/material'
import { Props } from './table-button'
import { createElement, useEffect, useState } from 'react'

export const TableButton: React.FC<Props> = ({
                                               children,
                                               color,
                                               disabled = false,
                                               modal,
                                               selectedIdRow,
                                               onClose
                                             }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (onClose && !open)
      onClose()
  }, [open])

  return (
      <>
        <Button
            color={ color }
            disabled={ disabled }
            size="small"
            variant="outlined"
            onClick={ () => setOpen(true) }
        >
          { children }
        </Button>

        { open && createElement(modal,
            {
              openDialog: open,
              handleCloseDialog: () => setOpen(false),
              selectedIdRow: selectedIdRow,
            }
        ) }
      </>
  )
}