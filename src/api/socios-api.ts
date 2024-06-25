import axios, { AxiosResponse } from 'axios'
import { ISocio } from '../types'

export const SociosAPI = {
    getSocios: () => {
        return axios
            .get(`http://localhost:8080/socios`)
            .then((response: AxiosResponse<ISocio[]>) => response.data)
    }
}