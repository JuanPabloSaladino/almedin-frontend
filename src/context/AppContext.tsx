import React, { createContext, useState, useEffect } from 'react';
import { ILogin, ITurno } from '../types';

interface AppContextType {
  turnos: ITurno[];
  setTurnos: (turnos: ITurno[]) => void;
  user: ILogin | null;
  setUser: (user: ILogin | null) => void;
}

interface Props {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [turnos, setTurnos] = useState<ITurno[]>([]);
  const [user, setUserState] = useState<ILogin | null>(null);

  // CAMBIO: para poder cargar el user desde localStorage al arrancar la app (f5)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // CAMBIO: para guardar  el usuario en localStorage cuando se actualiza (f5)
  const setUser = (user: ILogin | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    setUserState(user);
  };

  const contextValue = {
    turnos,
    setTurnos,
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
