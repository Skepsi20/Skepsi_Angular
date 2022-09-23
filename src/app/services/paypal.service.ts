import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { paypalProduct, subscriptionPayPal } from '../Models/PayPal/paypal';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  getPayPalProducts(): Observable<paypalProduct[]>{
    return this.httpClient.get<paypalProduct[]>(this.baseApiUrl + '/api/pay-pal/products/');
  }

  addSubscription(PayPalRequest: subscriptionPayPal): Observable<subscriptionPayPal>{
    const addSubRequest: subscriptionPayPal={
      externalId: PayPalRequest.externalId,
      externalType: PayPalRequest.externalType,
      planId: PayPalRequest.planId
    };
    return this.httpClient.post<subscriptionPayPal>(this.baseApiUrl+'/api/subscriptions/',addSubRequest);
  }

  getAllSales(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/sales');
  }


  addSale(request:any): Observable<any>{
    const body: any={

      id: request.id



      /*



  const request = {
    planId: this.skepsiPlanId,
    receipts: [
      {
        transactions:[
          {

              "receiptId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              "description": "string",
              "grossAmount": 0,
              "feeAmount": 0,
              "netAmount": 0,
              "status": "string",
              "transactionDateTime": "2022-09-10T18:05:17.130Z",
              "externalType": "string",
              "externalId": "string"

          }
        ]
      }
    ]
  }

  this.paypalService.addSale(request)
  .subscribe(
    (success)=>{
      console.log(success)
    },(error)=>{
      console.log(error)
    }
  )


*/



    };
    return this.httpClient.post<any>(this.baseApiUrl+'/api/sales/',body);
  }
}
