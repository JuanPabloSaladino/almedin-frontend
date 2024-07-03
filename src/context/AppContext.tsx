import React, { createContext, useState } from 'react';
import { ILogin, ITurno } from '../types';

interface AppContextType {
  turnos: ITurno[];
  setTurnos: (turnos: ITurno[]) => void;
  user :ILogin| null;
  setUser: (user: ILogin|null) =>void;

}

interface Props {
    children: React.ReactNode
}



export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [turnos, setTurnos] = useState<ITurno[]>([]);
  const [user, setUser] = useState<ILogin|null>(null);

  const contextValue = {
    turnos,
    setTurnos,
    user,
    setUser
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
