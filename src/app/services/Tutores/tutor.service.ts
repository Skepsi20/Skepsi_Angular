import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { zoomData } from 'src/app/Models/Tutores/dashboard';
import { newTutor, Tutores } from '../../Models/api-models/tutores.model';
import { ITutor } from '../../Models/api-models/tutores.model';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(private httpClient: HttpClient) { }

  getTutores(): Observable<ITutor[]>{
    return this.httpClient.get<ITutor[]>(this.baseApiUrl + '/api/tutors');
  }

  getGruposDeTutores(id:string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseApiUrl + '/api/tutors/'+id+'/groups');
  }

  getTutor(tutorId : string): Observable<ITutor>{
    return this.httpClient.get<ITutor>(this.baseApiUrl + '/api/tutors/' + tutorId);
  }

  addTutor(tutorRequest: newTutor): Observable<Tutores>{
    const addTutorRequest: newTutor={
      tutor: tutorRequest.tutor,
      user: tutorRequest.user
    };
    return this.httpClient.post<Tutores>(this.baseApiUrl+'/api/authentication/register-tutor/',addTutorRequest);
  }

  deleteTutor(tutorId: string):Observable<Tutores>{
    return this.httpClient.delete<Tutores>(this.baseApiUrl + '/api/authentication/'+tutorId);
  }

  getDashboardGroups(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/tutors/logged/groups');
  }

  getDashboardDetails(groupId:string): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/groups/'+groupId+'/tutor-dashboard');
  }

  createZoomLink(id:string, request:zoomData):Observable<zoomData>{
    const bodyRequest: zoomData={
      meetingUrl: request.meetingUrl,
      meetingPassword: request.meetingPassword,
    };
    return this.httpClient.put<any>(this.baseApiUrl+'/api/groups/'+id+'/meeting',bodyRequest);
  }

  getSessionId(planId: string):Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/plans/'+planId+'/todays-session');
  }

  getLink(sessionId:string, groupId:string):Observable<any>{
    console.log("session",sessionId)
    console.log("group",groupId)
    return this.httpClient.get<any>(this.baseApiUrl + '/api/group-sessions?groupId='+sessionId+'&sessionId='+groupId);
  }

  getStudentTutor():Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/students/logged/tutor');
  }

  updateImage(image:string):Observable<any>{
    const body:any = {
      profileImageUrl: image
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/tutors/logged/profile-image',body);
  }

  updateName(request:any):Observable<any>{
    const body:any = {
      firstName: request.firstName,
      lastName: request.lastName
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/tutors/logged/name',body);
  }
  updatePassword(request:any):Observable<any>{
    const body:any = {
      newPassword: request.password,
      confirmNewPassword: request.confirmedPassword,
      currentPassword: request.currentPassword,
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/authentication/change-password',body);
  }

  getTutorData(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/tutors/logged');
  }

  allTutorSessions(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/tutors/logged/groups/sessions');
  }

  updateDescription(request: any):Observable<any>{
    const body:any = {
      profileDescription: request.profileDescription,
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/tutors/logged/profile-description',body);
  }

  //SUSPENDER ALUMNOS
  getSuspendedStudents(status:string): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/students?Status='+status);
  }

  suspendStudent(request: any):Observable<any>{
    const body = {
      SuspensionComments: request.comments
    }
    return this.httpClient.put<any>(this.baseApiUrl + '/api/students/' + request.id + '/suspend',body);
  }

  cancelStudent(id:string): Observable<any>{
    return this.httpClient.delete<any>(this.baseApiUrl + '/api/students/'+id);
  }

  unsuspendStudent(id:string): Observable<any>{
    const body = {}
    return this.httpClient.put<any>(this.baseApiUrl + '/api/students/'+id+'/unsuspend',body);
  }
}
