import axios, { AxiosResponse } from 'axios';
import { ILogin } from '../types';

export const LoginAPI = {
  login: (email: string, password: string) => {

    return axios
      .get(`http://localhost:8080/login`, {
        params: {
          email,  
          password,
        },
      })
      .then((response: AxiosResponse<ILogin>) => response.data);
  },
}