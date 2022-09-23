export interface newPaquete{
  id:string,
  name: string,
  description: string,
  cost: number,
  duration: number,
  discountRate: any,
  capacity: number,
  registrationCost: any,
  schedule: string,
  expirationDate: any,
  institutionId?: string,
  templateId: string,
  PayPalProductId: string,
  isTrial: boolean,
  planDetail: IplanDetail
}

export interface paquete{
  id:string,
  name: string,
  description: string,
  cost: number,
  duration: number,
  discountRate: number,
  capacity: number,
  registrationCost: any,
  schedule: string,
  expirationDate: string,
  institutionId?: string,
  templateId: string,
  externalPlanId:string,
  botonesPayPal:boolean,
  isTrial: boolean,
  planDetail: IplanDetail
}

export interface IplanDetail{
  onMonday: boolean,
  onTuesday: boolean,
  onWednesday: boolean,
  onThursday: boolean,
  onFriday: boolean,
  onSaturday: boolean,
  onSunday: boolean,
}
