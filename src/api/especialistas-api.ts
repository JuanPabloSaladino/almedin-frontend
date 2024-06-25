import axios, { AxiosResponse } from 'axios'
import { IEspecialista } from '../types'

export const EspecialistasAPI = {
    getEspecialistas: () => {
        return axios
            .get('http://localhost:8080/especialistas')
            .then((response: AxiosResponse<IEspecialista[]>) => response.data)
    },
    getEspecialistaByID: (id: number) => {
        return axios
            .get(`http://localhost:8080/especialistas/dto/${ id }`)
            .then((response: AxiosResponse<IEspecialista>) => response.data)
    }
}