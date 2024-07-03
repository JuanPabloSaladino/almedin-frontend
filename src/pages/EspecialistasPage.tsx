import { useContext, useEffect, useState } from "react"
import { IEspecialista } from "../types"
import { EspecialistasAPI } from "../api/especialistas-api"
import { ProfesionalesTable } from "../components/ProfesionalesTable/ProfesionalesTable"
import AppBarComponent from "../components/AppBarComponent/AppBarComponent"
import { SnackbarContext } from "../context/SnackbarContext"

const EspecialistasPage: React.FC = () => {
    const [especialistas, setEspecialistas] = useState<IEspecialista[]>([])
    const { setOpen, setMessage} = useContext(SnackbarContext) 

    useEffect(()=>{
      EspecialistasAPI
          .getEspecialistas()
          .then((especialistas: IEspecialista[]) => {
              setEspecialistas(especialistas)
          })
          .catch(error => {
            setOpen(true)
            setMessage('Error al obtener especialistas')
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