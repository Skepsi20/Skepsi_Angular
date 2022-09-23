import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rutina } from 'src/app/Models/api-models/rutina.model';
import { templateCreate, template } from 'src/app/Models/api-models/rutina.model';

@Injectable({
  providedIn: 'root'
})
export class GestionRutinasService {
  private baseApiUrl = 'https://skepsi.azurewebsites.net';

  constructor(private httpClient: HttpClient) { }

  getRoutines(): Observable<rutina[]>{
    return this.httpClient.get<rutina[]>(this.baseApiUrl + '/api/routines');
  }

  addRoutine(routineRequest: rutina): Observable<rutina>{
    const routine: rutina={
      id: routineRequest.id,
      name: routineRequest.name,
      description: routineRequest.description,
      code: routineRequest.code,
      pillarType: routineRequest.pillarType,
      trainingPlanType: routineRequest.trainingPlanType,
      cognitiveDevelopmentLevel: routineRequest.cognitiveDevelopmentLevel,
      minAge: routineRequest.minAge,
      maxAge: routineRequest.maxAge
    };
    return this.httpClient.post<rutina>(this.baseApiUrl+'/api/routines',routine);
  }

  deleteRoutine(routineId: string):Observable<rutina>{
    return this.httpClient.delete<rutina>(this.baseApiUrl + '/api/routines/'+routineId);
  }

  getTemplates(): Observable<templateCreate[]>{
    return this.httpClient.get<templateCreate[]>(this.baseApiUrl + '/api/templates?withRoutines=true');
  }

  getTemplatesWithNoRoutines(): Observable<templateCreate[]>{
    return this.httpClient.get<templateCreate[]>(this.baseApiUrl + '/api/templates?withRoutines=false');
  }

  getTemplate(templateId: string): Observable<template>{
    return this.httpClient.get<template>(this.baseApiUrl + '/api/templates/'+templateId+'?withRoutines=true');
  }

  getTemplateWithNoRoutines(templateId: string): Observable<template>{
    return this.httpClient.get<template>(this.baseApiUrl + '/api/templates/'+templateId+'?withRoutines=false');
  }

  addTemplate(templateRequest: templateCreate):Observable<templateCreate>{
    const template = templateRequest;
    return this.httpClient.post<templateCreate>(this.baseApiUrl+'/api/templates',template);
  }

  deleteTemplate(templateId: string):Observable<rutina>{
    return this.httpClient.delete<rutina>(this.baseApiUrl + '/api/templates/'+templateId);
  }

}
