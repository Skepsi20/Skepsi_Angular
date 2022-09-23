export interface groupOfTutors{
  plan: IPlanWithTutor
}

export interface IPlanWithTutor{
  id:string,
  name: string,
  description: string,
  cost: number,
  duration: number,
  discountRate: number,
  capacity: number,
  schedule: string,
  expirationDate: string,
  tutors: ITutorInPlan[]
}

export interface ITutorInPlan{
  id: string,
  firstName: string,
  lastName: string,
  gender: string,
  dateOfBirth: string,
  registrationDate: string
}

export interface ITutorPlan{
  planId: string,
  tutorId: string
}
