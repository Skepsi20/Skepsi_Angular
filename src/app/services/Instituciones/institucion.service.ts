import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInstitution } from 'src/app/Models/api-models/Auth/addStudentRequest.model';

@Injectable({
  providedIn: 'root'
})
export class InstitucionService {
  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(private httpClient: HttpClient) { }

  add(institutionRequest: IInstitution): Observable<any>{
    const institution: IInstitution={
      id: institutionRequest.id,
      name: institutionRequest.name,
      shortName: institutionRequest.shortName,
    };
    return this.httpClient.post<IInstitution>(this.baseApiUrl+'/api/institutions',institutionRequest);
  }

  getInstitution(institutionId: string): Observable<IInstitution>{
    return this.httpClient.get<IInstitution>(this.baseApiUrl + '/api/institutions/'+ institutionId);
  }

  getAll(): Observable<IInstitution[]>{
    return this.httpClient.get<IInstitution[]>(this.baseApiUrl + '/api/institutions');
  }

  delete(institutionId: string){
    return this.httpClient.delete<IInstitution[]>(this.baseApiUrl + '/api/institutions/'+institutionId);
  }

  update(institutionId: string, institutionRequest: IInstitution): Observable<IInstitution>{
    const updateStudentRequest: IInstitution={
      id: institutionRequest.id,
      name: institutionRequest.name,
      shortName: institutionRequest.shortName,
    }
    return this.httpClient.put<IInstitution>(this.baseApiUrl + '/api/institutions/'+institutionId,updateStudentRequest);
  }
}
