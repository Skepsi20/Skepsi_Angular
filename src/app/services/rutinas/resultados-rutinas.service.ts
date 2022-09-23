import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resultados } from 'src/app/Models/api-models/resultados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultadosRutinasService {
  private baseApiUrl = 'https://skepsi.azurewebsites.net';

  constructor(
    private httpClient: HttpClient
  ) { }

  addResult(resultRequest: resultados): Observable<resultados>{
    const addResultRequest: resultados={
      id: resultRequest.id,
      studentId: resultRequest.studentId,
      routineName: resultRequest.routineName,
      type: resultRequest.type,
      level: resultRequest.level,
      possiblePoints: resultRequest.possiblePoints,
      points: resultRequest.points,
      grade: resultRequest.grade,
      hour: resultRequest.hour,
      date: resultRequest.date
    };
    return this.httpClient.post<resultados>(this.baseApiUrl+'/api/results/',resultRequest);
  }

  searchByPilar(pilar:string): Observable<any[]>{
    return this.httpClient.get<any[]>(this.baseApiUrl + '/api/routines/done-by-me?pillarType='+pilar);
  }

}
