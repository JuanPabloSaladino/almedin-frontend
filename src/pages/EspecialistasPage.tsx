import { useEffect, useState } from "react"
import { IEspecialista } from "../types"
import { EspecialistasAPI } from "../api/especialistas-api"
import { ProfesionalesTable } from "../components/ProfesionalesTable/ProfesionalesTable"
import AppBarComponent from "../components/AppBarComponent/AppBarComponent"

const EspecialistasPage: React.FC = () => {
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
            <AppBarComponent />
            <h1>Especialistas</h1>
            <ProfesionalesTable
                rows={ especialistas }
            />
        </>
    )
}

export default EspecialistasPage 