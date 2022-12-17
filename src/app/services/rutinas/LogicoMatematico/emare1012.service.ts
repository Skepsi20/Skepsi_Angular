import { Injectable } from '@angular/core';
import { EMARE } from 'src/app/Models/rutinas/LogicoMatematico/Recuperacion/emare.model';

@Injectable({
  providedIn: 'root',
})
export class Emare1012Service {
  public espaciosFig: Array<EMARE>;

  constructor() {
    this.espaciosFig = [
      new EMARE('07', '33'),
      new EMARE('08', '34'),
      new EMARE('09', '44'),
      new EMARE('10', '36'),
      new EMARE('11', '43'),
      new EMARE('12', '35'),
      new EMARE('13', '45'),
      new EMARE('14', '46'),
      new EMARE('15', '38'),
      new EMARE('16', '39'),
      new EMARE('17', '58'),
      new EMARE('18', '48'),
      new EMARE('19', '56'),
      new EMARE('20', '47'),
      new EMARE('21', '49'),
      new EMARE('22', '40'),
      new EMARE('23', '61'),
      new EMARE('24', '57'),
      new EMARE('25', '52'),
      new EMARE('26', '51'),
      new EMARE('27', '50'),
      new EMARE('28', '54'),
      new EMARE('29', '61'),
      new EMARE('30', '37'),
      new EMARE('31', '53'),
      new EMARE('32', '55'),
      new EMARE('05', '59'),
      new EMARE('04', '60'),
      new EMARE('03', '42'),
      new EMARE('02', '41'),
    ];
  }

  ngonInit() {
    //on Init
  }

  getEspaciosFig() {
    return this.espaciosFig;
  }
}
