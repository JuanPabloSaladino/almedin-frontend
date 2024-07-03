import React, { createContext, useState } from 'react'
import CustomSnackbar from '../components/CumstomSnackbar/CumstomSnackbar'

interface SnackbarContextType {
  open: boolean
  message: string
  setOpen: (open: boolean) => void
  setMessage: (message: string) => void
}

interface Props {
  children: React.ReactNode
}

export const SnackbarContext = createContext<SnackbarContextType>({
  open: false,
  message: '',
  setOpen: () => {},
  setMessage: () => {}
});

const SnackbarContextProvider: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')

  const contextValue: SnackbarContextType = {
    open,
    message,
    setOpen,
    setMessage
  }

  return (
    <SnackbarContext.Provider value={contextValue}>
      <CustomSnackbar message={ message } />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider
