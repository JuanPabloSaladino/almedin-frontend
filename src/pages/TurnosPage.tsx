import { useEffect, useState } from "react"
import { TurnosTable } from "../components/TurnosTable/TurnosTable"
import { TurnosAPI } from "../api/turnos-api"
import { ITurno } from "../types"
import AppBarComponent from "../components/AppBarComponent/AppBarComponent"

const TurnosPage: React.FC = () => {
    const [turnos, setTurnos] = useState<ITurno[]>([])

    useEffect(() => {
      TurnosAPI
          .getTurnos()
          .then((turnos: ITurno[]) => {
            setTurnos(turnos)
          })
    }, [])

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