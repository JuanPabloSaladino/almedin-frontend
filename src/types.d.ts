import { Dayjs } from "dayjs"

export interface IEspecialista {
  id: number,
  nombreMedico: string,
  especialidad: string,
  horarios: string[],
  ubicacion: string
}

export interface ITurno {
  fechaTurno: string
  profesionalID: number
  socioID: number
  motivoDeConsultaTurno: string
  id: number
  cancelado: boolean
  fechaTurno: Dayjs | null
  tieneReceta: boolean
}

export interface ISocio {
  nombre: string,
  email: string,
  id: number
}

export interface ILogin {
  
    idUsuario: number | string,
    nombreUsuario: string,
    rol: string
  
}

export interface IReceta {
  contenido: string;
  nombreProfesional: string;
  nroMatriculaProfesional: string;
  nombreSocio: string;
  fechaCreacion: string | null;
}