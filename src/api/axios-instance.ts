import axios, { AxiosResponse } from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const instance = axios.create({
    baseURL: process.env.PUBLIC_API_REST_URL
})

instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.warn(error)
        throw error
    }
)