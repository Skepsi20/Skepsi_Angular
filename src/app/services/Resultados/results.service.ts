import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iroutine, sessionResults, studentSessionsWithResults } from 'src/app/Models/Resultados/sessionsResults';
import { studentSession } from 'src/app/Models/Resultados/sessionsResults';
import { results,resultsWithDate } from 'src/app/Models/Resultados/sessionsResults';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  getSession(): Observable<sessionResults>{
    return this.httpClient.get<sessionResults>(this.baseApiUrl + '/api/students/session/');
  }

  getNextSession(id:any): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/plans/'+id+'/next-session');
  }

  getStudentSessions(): Observable<any>{
    return this.httpClient.get<any>(this.baseApiUrl + '/api/student-sessions/current/');
  }

  addStudentSessions(idRequest: string): Observable<studentSession>{
    const idBody: any ={
      sessionId: idRequest,
    };
    return this.httpClient.post<studentSession>(this.baseApiUrl + '/api/student-sessions/',idBody);
  }

  addResults(resultsRequest: results){
    const resultsBody: results ={
      studentSessionId: resultsRequest.studentSessionId,
      date: resultsRequest.date,
      grade: resultsRequest.grade,
      round: resultsRequest.round,
      level: resultsRequest.level,
      resultDetails: resultsRequest.resultDetails,
    };
    return this.httpClient.post<results>(this.baseApiUrl + '/api/results/',resultsBody);
  }

  getRoutinesWithResults(): Observable<Iroutine[]>{
    return this.httpClient.get<Iroutine[]>(this.baseApiUrl + '/api/routines/done-by-me/');
  }

  getStudentSessionWithResults(id: string): Observable<studentSessionsWithResults[]>{
    return this.httpClient.get<studentSessionsWithResults[]>(this.baseApiUrl + '/api/routines/'+id+'/student-sessions-by-me/');
  }

  addStatus():Observable<any>{
    return this.httpClient.put<any>(this.baseApiUrl + '/api/students/activity',null);
  }

}
