import axios, { AxiosResponse } from 'axios'
import { ITurno } from '../types'

export const TurnosAPI = {
    getTurnos: () => {
        return axios
            .get(`http://localhost:8080/turnos`)
            .then((response: AxiosResponse<ITurno[]>) => response.data)
    },
    getTurnoByID: (id: string) => {
        return axios
            .get(`http://localhost:8080/turnos/${ id }`)
            .then((response: AxiosResponse<ITurno>) => response.data)
    },
    deleteTurnos: (id: string) => {
        return axios
            .delete(`http://localhost:8080/turnos/${ id }`)
            .then((response: AxiosResponse<string>) => response.data)
    },
    updateTurno: (id: number, turno: ITurno) => {
        return axios
            .put(`http://localhost:8080/turnos/${ id }`, turno)
            .then((response: AxiosResponse<ITurno>) => response.data)
    },
    createTurno: (turno: ITurno) => {
        return axios
            .post('http://localhost:8080/turnos', turno)
            .then((response: AxiosResponse<ITurno>) => response.data)
    }
}