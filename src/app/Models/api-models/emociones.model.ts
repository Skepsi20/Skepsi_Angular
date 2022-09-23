import { Students } from "./students.model";
import { Tutores } from './tutores.model';

export interface emociones{
  id: string,
  rutina: string,
  alumnoId: string,
  calificacion: number,
  fecha: string,
  tutorId: string,
  alumno: Students,
  tutor: Tutores,
}
