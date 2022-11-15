import { grupo } from "../Plans/grupo.model"

export interface addStudentRequest{
  student: IStudent,
  user: newIUser
}

export interface IStudent{
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  gender: string,
  group: grupo,
  address: IAddress,
  institutionId: any,
  relative: IRelative
}

export interface IAddress{
  city: string,
  StateProvinceCodeId: string,
  postalCode: string,
  line1: string,
  line2: string,
}

export interface IInstitution{
  id: string,
  name: string,
  shortName: string,
  isChecked?: boolean
}

export interface IRelative{
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
}

export interface IUser{
  userName: string,
  password: string,
  email: string,
  phoneNumber: string,
}

export interface newIUser{
  password: string,
  email: string,
  phoneNumber: string,
}
