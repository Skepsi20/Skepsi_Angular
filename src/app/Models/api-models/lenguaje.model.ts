import { Students } from "./students.model";
import { Tutores } from './tutores.model';

export interface lenguaje{
  id: string,
  rutina: string,
  calificacion: number,
  fecha: string,
  alumno: string,
  tutor: string,
  estado: string
}
