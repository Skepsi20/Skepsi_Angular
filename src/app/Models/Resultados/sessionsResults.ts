export interface sessionResults{
  id: string,
  date: string,
  routine: Iroutine,
  plan: Iplan,
  status:string,
  meetingUrl: string,
  meetingPassword: string,
}

export interface Iroutine{
  id: string,
  name: string,
  code: string,
  description: string,
  pillarType: Pilar,
  TrainingPlanType: TrainigPlan,
  CognitiveDevelopmentLevel: CognitiveDevelopment,
  minAge: number,
  maxAge: number,
  sequence: number
}

export enum Pilar{
  Gnostiki = 1,
  Synaisthimata = 2,
  Glossa = 3,
  Mathimatiki = 4
}

export enum TrainigPlan{
  Dynami = 1,
  Antochi = 2,
  Exousia = 3
}

export enum CognitiveDevelopment{
  Recuperacion = 1,
  Comprension = 2,
  Analisis = 3,
  UtilizacionDelConocimiento = 4,
  Metacognitivo = 5,
  Self = 6
}

export interface Iplan{
  id: string,
  name: string,
  description: string,
  schedule: string
}

export interface studentSession{
  id: string,
  studentId: string,
  sessionId: string
}

export interface results{
  studentSessionId: string,
  date: string,
  grade: number,
  round: number,
  level: number,
  resultDetails: IresultDetails[]
}

export interface resultsWithDate{
  date:string,
  studentSessionId: string,
  grade: number,
  round: number,
  level: number,
  resultDetails: IresultDetails[]
}

export interface IresultDetails{
  possiblePoints: number,
  points: number,
  possiblePointsDescription: string,
  pointsDescription: string
}

export interface studentSessionsWithResults{
  id: string,
  studentId: string,
  sessionId: string,
  results: results[]
}
