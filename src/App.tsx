import { useState, useEffect } from 'react'
import { IEspecialista, ITurno } from './types'

import * as React from 'react'

import { ProfesionalesTable } from './components/ProfesionalesTable/ProfesionalesTable'
import { EspecialistasAPI } from './api/especialistas-api'
import { TurnosAPI } from './api/turnos-api'
import { TurnosTable } from './components/TurnosTable/TurnosTable'

const App: React.FC = () => {
  const [especialistas, setEspecialistas] = useState<IEspecialista[]>([])
  const [turnos, setTurnos] = useState<ITurno[]>([])

  useEffect(()=>{
    EspecialistasAPI
        .getEspecialistas()
        .then((especialistas: IEspecialista[]) => {
            setEspecialistas(especialistas)
        })

    TurnosAPI
        .getTurnos()
        .then((turnos: ITurno[]) => {
          setTurnos(turnos)
        })
  }, [])

  return (
      <>
        <h2>Especialistas</h2>
        <ProfesionalesTable
            rows={ especialistas }
        />
        <h2>Turnos</h2>
        <TurnosTable
            rows={ turnos }
        />
      </>
  )
}

export default App
