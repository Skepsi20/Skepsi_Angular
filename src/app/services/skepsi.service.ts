import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkepsiService {

  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  addMessage(request: any): Observable<any>{
    const body: any={
      name: request.name,
      phoneNumber: request.phoneNumber,
      email: request.email,
      comments: request.comments,
      sourceArea:request.sourceArea
    };
    return this.httpClient.post<any>(this.baseApiUrl+'/api/messages/',body);
  }

  getMessages(role:string): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/messages?SourceArea='+role);
  }

  deleteMessage(clientId: string){
    return this.httpClient.delete<any>(this.baseApiUrl + '/api/messages/'+clientId);
  }


  ////////////////////////////
  updateMessage(request: any): Observable<any>{
    const body: any={
      name: request.name,
      phoneNumber: request.phoneNumber,
      email: request.email,
      comments: request.comments,
      sourceArea: request.sourceArea,
      status : request.status
    };
    return this.httpClient.put<any>(this.baseApiUrl+'/api/messages/'+request.id,body);
  }



}
