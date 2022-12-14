export interface newPaquete{
  id:string,
  name: string,
  description: string,
  cost: number,
  duration: number,
  discountRate: any,
  registrationCost: any,
  PayPalProductId: string,
  isTrial: boolean,
  numberOfDaysPerWeek: number, 
  minAge: number, 
  maxAge: number, 
}

export interface paquete{
  id:string,
  name: string,
  description: string,
  cost: number,
  duration: number,
  discountRate: number,
  registrationCost: any,
  externalPlanId:string,
  botonesPayPal:boolean,
  isTrial: boolean,
  numberOfDaysPerWeek: number, 
  minAge: number, 
  maxAge: number, 
}
