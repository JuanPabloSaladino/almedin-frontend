import React, { createContext, useContext, useState } from 'react';
import { ITurno } from '../types';

interface AppContextType {
  turnos: ITurno[];
  setTurnos: (turnos: ITurno[]) => void;
}

interface Props {
    children: React.ReactNode
}

// Creamos el contexto con un valor inicial
export const AppContext = createContext<AppContextType>({} as AppContextType);

// Componente proveedor que utiliza el contexto
const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [turnos, setTurnos] = useState<ITurno[]>([]);

  const contextValue = {
    turnos,
    setTurnos
  }

  return (
    <AppContext.Provider
      value={ contextValue }
      >
        { children }
    </AppContext.Provider>
  );
};

export default AppContextProvider
