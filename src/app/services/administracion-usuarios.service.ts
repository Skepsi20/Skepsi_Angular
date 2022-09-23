import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministracionUsuariosService {

  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  getUsers(role:string): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/people?role='+role);
  }

  deleteUser(usuario: string):Observable<any>{
    return this.httpClient.delete<any>(this.baseApiUrl + '/api/people/'+usuario);
  }

  getData():Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/people/logged');
  }

  addUser(request: any): Observable<any>{
    const body: any={
      firstName: request.firstName,
      lastName: request.lastName,
      gender: request.gender,
      user: request.user
    };
    return this.httpClient.post<any>(this.baseApiUrl+'/api/people/',body);
  }

  ///////////////////////////////////
  updateImage(image:string):Observable<any>{
    const body:any = {
      profileImageUrl: image
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/people/logged/profile-image',body);
  }

  updateName(request:any):Observable<any>{
    const body:any = {
      firstName: request.firstName,
      lastName: request.lastName
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/people/logged/name',body);
  }

  updatePassword(request:any):Observable<any>{
    const body:any = {
      newPassword: request.password,
      confirmNewPassword: request.confirmedPassword,
      currentPassword: request.currentPassword,
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/authentication/change-password',body);
  }


}
