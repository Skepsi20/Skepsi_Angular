export interface grupo {
  id: string,
  code: string,
  planId: string,
  groupOfStudents: string,
  tutorId: string
}

export interface newGroup{
  planId: string,
  tutorId : string,
  schedule: string,
  capacity: number,
  onMonday: boolean,
  onTuesday: boolean,
  onWednesday: boolean,
  onThursday: boolean,
  onFriday: boolean,
  onSaturday: boolean,
  onSunday: boolean,
  institutionIds: string[],
}
