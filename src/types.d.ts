export interface IEspecialista {
  id: number,
  nombreMedico: string,
  especialidad: string,
  horarios: string[],
  ubicacion: string
}

export interface ITurno {
  fechaTurno: string,
  profesionalID: number,
  socioID: number,
  motivoDeConsultaTurno: string,
  id: number
  cancelado: boolean
}

export interface ISocio {
  nombre: string,
  email: string,
  id: number
}