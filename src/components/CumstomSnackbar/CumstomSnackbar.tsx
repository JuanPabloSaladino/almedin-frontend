import React, { useContext, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Props } from './custom-snackbar';
import { SnackbarContext } from '../../context/SnackbarContext';

const CustomSnackbar: React.FC<Props> = ({ message }) => {
  const { open, setOpen } = useContext(SnackbarContext)

  useEffect(( ) => {
    if (message) {
      setOpen(true)
    }
  }, [message, setOpen])

  useEffect(( ) => {
    let timeoutId: NodeJS.Timeout

    if (open) {
      timeoutId = setTimeout(() => {
        setOpen(false)
      }, 5000)
    }

    return ( ) => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    };
  }, [open, setOpen])

  return (
    <Snackbar
      open={ open }
      autoHideDuration={ 5000 }
      message={ message }
      onClose={( ) => setOpen(false)}
    />
  );
};

export default CustomSnackbar;
