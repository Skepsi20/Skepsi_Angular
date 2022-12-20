import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { holiday } from 'src/app/Models/api-models/rutinasFechadas/holiday.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinasFechadasService {

  private baseApiUrl = 'https://skepsitest.azurewebsites.net';
  constructor(
    private httpClient: HttpClient
  ){}

  addHoliday(holidayRequest: holiday): Observable<holiday>{
    const addHolidayRequest: holiday={
      id: holidayRequest.id,
      name: holidayRequest.name,
      date: holidayRequest.date
    };
    return this.httpClient.post<holiday>(this.baseApiUrl+'/api/holidays/',addHolidayRequest);
  }

  getHolidays(): Observable<holiday[]>{
    return this.httpClient.get<holiday[]>(this.baseApiUrl + '/api/holidays/');
  }

  deleteHoliday(holiday: string){
    return this.httpClient.delete<holiday[]>(this.baseApiUrl + '/api/holidays/'+holiday);
  }
}
