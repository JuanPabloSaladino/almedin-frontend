import axios, { AxiosResponse } from 'axios'
import { ISocio } from '../types'

export const SociosAPI = {
    getSocios: (idUsuario: number | string, rol: string)  => {
        return axios
            .get(`http://localhost:8080/socios`, {params: {idUsuario,rol}})
            .then((response: AxiosResponse<ISocio[]>) => response.data)
    }
}