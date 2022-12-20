import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../../Models/api-models/students.model';
import { addStudentRequest } from '../../Models/api-models/Auth/addStudentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseApiUrl = 'https://skepsitest.azurewebsites.net';

  constructor(
    private httpClient: HttpClient
    ) { }

  getAllStudents(): Observable<Students[]>{
    return this.httpClient.get<Students[]>(this.baseApiUrl + '/LoginStudents');
  }
  getStudentsById(studentId : string): Observable<Students>{
    return this.httpClient.get<Students>(this.baseApiUrl + '/LoginStudent/' + studentId);
  }

  addStudent(studentRequest: addStudentRequest): Observable<addStudentRequest>{
    const addStudentRequest: addStudentRequest={
      student: studentRequest.student,
      user: studentRequest.user
    };
    return this.httpClient.post<addStudentRequest>(this.baseApiUrl+'/api/authentication/register-user/',addStudentRequest);
  }

  confirmUser(data:any): Observable<any>{
  const body: any={
    email: data.email,
    token: data.token
  };
  return this.httpClient.post<any>(this.baseApiUrl+'/api/authentication/email-confirmation',body);
  }

  getStates(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/codeTables/0');
  }

  forgotPassword(data:any): Observable<any>{
    const body: any={
      email: data.email,
      token: data.token,
      password: data.password,
      confirmPassword: data.confirmPassword
    };
    return this.httpClient.post<any>(this.baseApiUrl+'/api/authentication/reset-password',body);
    }

}
