export interface paypalProduct{
  id: string,
  name: string,
  description: string
}

export interface subscriptionPayPal{
  externalId?: string,
  externalType?: string
  planId:string
}
