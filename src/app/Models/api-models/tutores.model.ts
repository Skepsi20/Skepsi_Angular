export interface Tutores{
  tutor: ITutor,
  user: IUser
}

export interface ITutor{
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  institutionId: string,
  institutionOther: string,
  registrationDate: string,
  profileDescription: string,
  ProfileImageUrl:string,
  userId: string,
  gender: string,
  address: IAddress,
}

export interface IUser{
  userName: string,
  password: string,
  email: string,
  phoneNumber: string,
}

export interface IAddress{
  city: string,
  StateProvinceCodeId: string,
  postalCode: string,
  line1: string,
  line2: string,
}

export interface newTutor{
  tutor: INewTutor,
  user: INewUser
}

export interface INewTutor{
  id: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  institutionId: string,
  institutionOther: string,
  registrationDate: string,
  profileDescription: string,
  ProfileImageUrl:string,
  userId: string,
  gender: string,
  address: IAddress,
}

export interface INewUser{
  password: string,
  email: string,
  phoneNumber: string,
}
