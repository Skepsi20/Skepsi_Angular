export interface rutina{
  id: string,
  code: string,
  name: string,
  description: string,
  pillarType: string,
  trainingPlanType: string,
  cognitiveDevelopmentLevel: string,
  minAge: 0,
  maxAge: 0
}

export interface template{
  id: string,
  name: string,
  routines: IroutinesTemplate[],
  description: string
}

export interface templateCreate{
  id: string,
  name: string,
  routines: string[],
  description: string
}

export interface IroutinesTemplate{
  id: string,
  maxAge: number,
  minAge: number,
  name: string,
  routineType: number,
  sequence: number
}
