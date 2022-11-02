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
      groupId: PayPalRequest.groupId
    };
    return this.httpClient.post<subscriptionPayPal>(this.baseApiUrl+'/api/subscriptions/',addSubRequest);
  }

  getAllSales(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/sales');
  }


  addSale(request:any): Observable<any>{
    const body: any={
      id: request.id
    };
    return this.httpClient.post<any>(this.baseApiUrl+'/api/sales/',body);
  }
}
