import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../../Models/api-models/students.model';
import { updateStudentRequest } from '../../Models/api-models/Auth/updateStudentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseApiUrl = 'https://skepsitest.azurewebsites.net';

  constructor(private httpClient: HttpClient) { }

  refreshToken(request: any): Observable<any>{
    const refreshTokenRequest: any={
      accessToken: request.accessToken,
      refreshToken: request.refreshToken,
    }
    return this.httpClient.post<any>(this.baseApiUrl + '/api/token/refresh/', refreshTokenRequest);
  }

  updateImage(image:string):Observable<any>{
    const body:any = {
      profileImageUrl: image
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/students/logged/profile-image',body);
  }

  updateName(request:any):Observable<any>{
    const body:any = {
      firstName: request.firstName,
      lastName: request.lastName
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/students/logged/name',body);
  }

  getStudentData(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/students/logged');
  }

  updatePassword(request:any):Observable<any>{
    const body:any = {
      newPassword: request.password,
      confirmNewPassword: request.confirmedPassword,
      currentPassword: request.currentPassword,
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/authentication/change-password',body);
  }

  allStudentSessions(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/students/logged/sessions');
  }
}
