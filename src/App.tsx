import { useState, useEffect } from 'react'
import { IEspecialista } from './types'

import * as React from 'react'

import { Table } from './components/Table/Table'
import { EspecialistasAPI } from './api/especialistas-api'

const App: React.FC = () => {
  const [especialistas, setEspecialistas] = useState<IEspecialista[]>([])

  useEffect(()=>{
    EspecialistasAPI
        .getEspecialistas()
        .then((especialistas: IEspecialista[]) => {
            setEspecialistas(especialistas)
        })
  }, [])

  return (
      <>
        <h2>Especialistas</h2>
        <Table
            rows={ especialistas }
        />
      </>
  )
}

export default App
