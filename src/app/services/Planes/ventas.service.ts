import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { newPaquete, paquete } from '../../Models/api-models/Plans/paquete.model';
import { Observable } from 'rxjs';
import { groupOfTutors, ITutorPlan, IPlanWithTutor } from 'src/app/Models/api-models/Plans/groupOfTutors.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private baseApiUrl = 'https://skepsi.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  ngonInit(){
  }

  addPaquete(paqueteRequest: newPaquete): Observable<newPaquete>{
    const addPaqueteRequest: newPaquete={
      id: paqueteRequest.id,
      name: paqueteRequest.name,
      description: paqueteRequest.description,
      cost: paqueteRequest.cost,
      duration: paqueteRequest.duration,
      discountRate: paqueteRequest.discountRate,
      registrationCost: paqueteRequest.registrationCost,
      PayPalProductId: paqueteRequest.PayPalProductId,
      isTrial: paqueteRequest.isTrial,
      numberOfDaysPerWeek: paqueteRequest.numberOfDaysPerWeek, 
      minAge: paqueteRequest.minAge, 
      maxAge: paqueteRequest.maxAge, 
    };
    return this.httpClient.post<newPaquete>(this.baseApiUrl+'/api/plans/',addPaqueteRequest);
  }

  //COMO ESTUDIANTE
  getAllPaquetesAvailable(): Observable<paquete[]>{
    return this.httpClient.get<paquete[]>(this.baseApiUrl + '/api/plans/opened');
  }
  //COMO ADMIN
  getAllPaquetes(): Observable<paquete[]>{
    return this.httpClient.get<paquete[]>(this.baseApiUrl + '/api/plans');
  }

  getPaqueteSuscrito(): Observable<paquete>{
    return this.httpClient.get<paquete>(this.baseApiUrl + '/api/plans/logged/');
  }

  getPaquete(planId: string): Observable<paquete>{
    return this.httpClient.get<paquete>(this.baseApiUrl + '/api/plans/'+planId);
  }

  getStudentCourse(studentId: string):Observable<paquete>{
    return this.httpClient.get<paquete>(this.baseApiUrl + '/api/plans/'+studentId);
  }

  addTutorsToPlan(tutorRequest: ITutorPlan): Observable<ITutorPlan>{
    const addTutorRequest: ITutorPlan={
      planId: tutorRequest.planId,
      tutorId : tutorRequest.tutorId,
    };
    return this.httpClient.post<ITutorPlan>(this.baseApiUrl+'/api/plans/assign-tutor/',addTutorRequest);
  }

  deleteTutorFromPlan(tutorId: string, planId: string){
    return this.httpClient.delete<IPlanWithTutor[]>(this.baseApiUrl + '/api/plans/'+planId+'/delete-tutor/'+tutorId);
  }
}
