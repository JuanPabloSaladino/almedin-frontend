export interface IEspecialista {
  nombreMedico: string,
  especialidad: string,
  horarios: string[],
  ubicacion: string
}

export interface ITurno {
  fechaTurno: string,
  profesionalID: string,
  socioID: string,
  motivoDeConsultaTurno: string,
  ID: string
}