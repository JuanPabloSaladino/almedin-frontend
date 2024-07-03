import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import { Props } from './custom-snackbar'
import { useEffect, useState } from 'react'

const CustomSnackbar: React.FC<Props> = ({ message, openSnackbar }) => {
  const [open, setOpen] = useState(false)

  useEffect(( ) => {
    setOpen(openSnackbar)
  }, [openSnackbar])

  useEffect(( ) => {
    let timeoutId: NodeJS.Timeout

    if (open) {
      timeoutId = setTimeout(( ) => {
        setOpen(false)
      }, 5000)
    }

    return ( ) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [open])

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default CustomSnackbar
