import { useContext, useEffect, useState } from "react"
import { TurnosTable } from "../components/TurnosTable/TurnosTable"
import { TurnosAPI } from "../api/turnos-api"
import { ITurno } from "../types"
import AppBarComponent from "../components/AppBarComponent/AppBarComponent"
import { AppContext } from "../context/AppContext"

const TurnosPage: React.FC = () => {
    const [turnos, setTurnos] = useState<ITurno[]>([])
    
    const { user } = useContext(AppContext);
    const { turnos: turnosContext} = useContext(AppContext) 

    useEffect(() => {
        if (user) {
            TurnosAPI
                .getTurnosConUser(user.idUsuario, user.rol)
                .then((turnos: ITurno[]) => {
                    setTurnos(turnos);
                });
        }
    }, [user, turnosContext]);

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