import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newGroup } from '../../Models/api-models/Plans/grupo.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private baseApiUrl = 'https://skepsitest.azurewebsites.net';

  public plan: string = ''
  public grupo: string = ''
  public detallesPlantilla: string = ''
  public dashboardGrupoId: string = ''

  constructor(
    private httpClient: HttpClient
  ) { }
  setPlan(data:string){
    this.plan = data
  }
  getPlan(){
    return this.plan;
  }
  setGrupo(data:string){
    this.grupo = data
  }
  getGrupo(){
    return this.grupo;
  }
  setDetallesPlantilla(detallePlantilla: string){
    this.detallesPlantilla = detallePlantilla
  }
  getDetallesPlantilla(){
    return this.detallesPlantilla;
  }
  getDashboardId(){
    return this.dashboardGrupoId
  }
  setDashboardId(id: string){
    this.dashboardGrupoId = id
  }
  getAllgrupos(planId: string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseApiUrl + '/api/plans/'+planId+'/groups');
  }

  getAllStudentSessions(studentId: string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseApiUrl + '/api/students/'+studentId+'/student-sessions');
  }

  getgroup(grupoId: string): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/groups/'+grupoId);
  }

  changeRoutineStatus(id: string, request:boolean): Observable<any[]>{
    const requestBody: any={
      status: request,
    };
    return this.httpClient.put<any[]>(this.baseApiUrl + '/api/groups/'+id+'/routine-status',requestBody);
  }

  getSessions(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/sessions/');
  }

  getSession(id:string): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/sessions/'+id);
  }

  deleteSession(id:string): Observable<any>{
    return this.httpClient.delete<any>(this.baseApiUrl + '/api/sessions/'+id);
  }

  createSession(sessionRequest: any): Observable<any>{
    return this.httpClient.post<any>(this.baseApiUrl+'/api/sessions/',sessionRequest);
  }

  createGroup(newGroupRequest: newGroup): Observable<newGroup>{
    return this.httpClient.post<newGroup>(this.baseApiUrl+'/api/groups/',newGroupRequest);
  }

  deleteGroup(groupId: string): Observable<any>{
    return this.httpClient.delete<any>(this.baseApiUrl+'/api/groups/'+groupId);
  }

  deletePlan(planId: string): Observable<any>{
    return this.httpClient.delete<any>(this.baseApiUrl+'/api/plans/'+planId);
  }

  crearInscipcion(planId: string): Observable<any>{
    return this.httpClient.post<any>(this.baseApiUrl+'/api/plans/'+planId+'/enroll',null);
  }

  cambiarGrupo(changeGroupRequest: any): Observable<any>{
    const changeGroup: any ={
      destinationGroupId: changeGroupRequest.group
    }
    return this.httpClient.put<any>(this.baseApiUrl+'/api/students/'+changeGroupRequest.student.id+'/group', changeGroup);
  }

  cambiarTutor(changeTutorRequest: any): Observable<any>{
    const changeTutor: any ={
      newTutorId: changeTutorRequest.tutor
    }
    return this.httpClient.put<any>(this.baseApiUrl+'/api/groups/'+changeTutorRequest.group+'/tutor', changeTutor);
  }

}
