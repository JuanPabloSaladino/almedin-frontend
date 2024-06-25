import { useContext, useEffect, useState } from "react"
import { TurnosTable } from "../components/TurnosTable/TurnosTable"
import { TurnosAPI } from "../api/turnos-api"
import { ITurno } from "../types"
import AppBarComponent from "../components/AppBarComponent/AppBarComponent"
import { AppContext } from "../context/AppContext"

const TurnosPage: React.FC = () => {
    const [turnos, setTurnos] = useState<ITurno[]>([])

    const { turnos: turnosContext} = useContext(AppContext) 

    useEffect(() => {
      TurnosAPI
          .getTurnos()
          .then((turnos: ITurno[]) => {
            setTurnos(turnos)
          })
    }, [turnosContext])

    return (
        <>
            <AppBarComponent />
            <h1>Turnos</h1>
            <TurnosTable
                rows={ turnos }
            />
        </>
    )
}

export default TurnosPage 