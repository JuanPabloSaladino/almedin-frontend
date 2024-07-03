import axios, { AxiosResponse } from 'axios'
import { IReceta } from '../types'

export const RecetasAPI = {
    descargarReceta: (idTurno: number, idUsuario: number | string) => {
        
        return axios
            .get(`http://localhost:8080/recetas/descargar/${idTurno}/${idUsuario}`)
            .then((response: AxiosResponse<IReceta>) => {
                console.log('API Response, ESTA ES LA RESPUESTA DE LA API:', response);
                return response.data;
            })
            .catch((error) => {
                console.error('Error en la llamada a la API:', error);
                throw error;
            });
    }
}
