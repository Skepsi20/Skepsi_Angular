import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { credentials } from '../../Models/api-models/Auth/credentials.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(private httpClient: HttpClient) { }

  login(credentialsRequest: credentials): Observable<any>{
    const credentials: credentials={
      userName: credentialsRequest.userName,
      password: credentialsRequest.password
    };
    return this.httpClient.post<credentials>(this.baseApiUrl+'/api/authentication/login/',credentials);
  }

  forgotPassword(email: string): Observable<any>{
    const body ={
      email: email
    };
    return this.httpClient.post<any>(this.baseApiUrl+'/api/authentication/forgot-password',body);
  }



}
