import { Injectable } from '@angular/core';
import { DMAAN } from 'src/app/Models/rutinas/LogicoMatematico/Analisis/dmaan.model';

@Injectable({
  providedIn: 'root'
})
export class Dmaan1012Service {

  public operaciones: Array<DMAAN>;
  public figGeometrica: Array<DMAAN>;

  constructor() {
    this.operaciones = [
      new DMAAN(['0', '+', '3', '3'], '', '', []),
      new DMAAN(['18', '+', '7', '25'], '', '', []),
      new DMAAN(['7', '+', '20', '27'], '', '', []),
      new DMAAN(['9', '+', '18', '27'], '', '', []),
      new DMAAN(['1', '+', '14', '15'], '', '', []),
      new DMAAN(['0', '+', '19', '19'], '', '', []),
      new DMAAN(['15', '+', '11', '26'], '', '', []),
      new DMAAN(['9', '+', '5', '14'], '', '', []),
      new DMAAN(['13', '+', '0', '13'], '', '', []),
      new DMAAN(['12', '+', '18', '30'], '', '', []),
      new DMAAN(['16', '+', '5', '21'], '', '', []),
      new DMAAN(['19', '+', '13', '32'], '', '', []),
      new DMAAN(['2', '+', '17', '19'], '', '', []),
      new DMAAN(['2', '+', '19', '21'], '', '', []),
      new DMAAN(['18', '+', '12', '30'], '', '', []),
      new DMAAN(['0', '+', '16', '16'], '', '', []),
      new DMAAN(['2', '+', '10', '12'], '', '', []),
      new DMAAN(['19', '+', '10', '29'], '', '', []),
      new DMAAN(['5', '+', '10', '15'], '', '', []),
      new DMAAN(['9', '+', '18', '27'], '', '', []),
      new DMAAN(['9', 'x', '4', '36'], '', '', []),
      new DMAAN(['13', 'x', '3', '39'], '', '', []),
      new DMAAN(['2', 'x', '4', '8'], '', '', []),
      new DMAAN(['12', 'x', '7', '84'], '', '', []),
      new DMAAN(['12', 'x', '2', '24'], '', '', []),
      new DMAAN(['4', 'x', '3', '12'], '', '', []),
      new DMAAN(['13', 'x', '5', '65'], '', '', []),
      new DMAAN(['17', 'x', '5', '85'], '', '', []),
      new DMAAN(['14', 'x', '8', '112'], '', '', []),
      new DMAAN(['8', 'x', '9', '72'], '', '', []),
      new DMAAN(['16', 'x', '5', '80'], '', '', []),
      new DMAAN(['3', 'x', '9', '27'], '', '', []),
      new DMAAN(['20', 'x', '8', '160'], '', '', []),
      new DMAAN(['9', 'x', '4', '36'], '', '', []),
      new DMAAN(['11', 'x', '3', '33'], '', '', []),
      new DMAAN(['20', 'x', '9', '180'], '', '', []),
      new DMAAN(['1', 'x', '5', '5'], '', '', []),
      new DMAAN(['15', 'x', '8', '120'], '', '', []),
      new DMAAN(['10', 'x', '5', '50'], '', '', []),
      new DMAAN(['8', 'x', '7', '56'], '', '', []),
      new DMAAN(['42', '-', '2', '40'], '', '', []),
      new DMAAN(['41', '-', '6', '35'], '', '', []),
      new DMAAN(['47', '-', '11', '36'], '', '', []),
      new DMAAN(['33', '-', '29', '4'], '', '', []),
      new DMAAN(['45', '-', '18', '27'], '', '', []),
      new DMAAN(['43', '-', '28', '15'], '', '', []),
      new DMAAN(['40', '-', '27', '13'], '', '', []),
      new DMAAN(['48', '-', '17', '31'], '', '', []),
      new DMAAN(['43', '-', '9', '34'], '', '', []),
      new DMAAN(['36', '-', '7', '29'], '', '', []),
      new DMAAN(['32', '-', '9', '23'], '', '', []),
      new DMAAN(['46', '-', '3', '43'], '', '', []),
      new DMAAN(['38', '-', '15', '23'], '', '', []),
      new DMAAN(['33', '-', '26', '7'], '', '', []),
      new DMAAN(['44', '-', '28', '16'], '', '', []),
      new DMAAN(['45', '-', '27', '18'], '', '', []),
      new DMAAN(['41', '-', '6', '35'], '', '', []),
      new DMAAN(['36', '-', '22', '14'], '', '', []),
      new DMAAN(['47', '-', '11', '36'], '', '', []),
      new DMAAN(['49', '-', '26', '23'], '', '', []),
      new DMAAN(['36', '/', '4', '9'], '', '', []),
      new DMAAN(['27', '/', '9', '3'], '', '', []),
      new DMAAN(['54', '/', '6', '9'], '', '', []),
      new DMAAN(['45', '/', '9', '5'], '', '', []),
      new DMAAN(['12', '/', '4', '3'], '', '', []),
      new DMAAN(['9', '/', '3', '3'], '', '', []),
      new DMAAN(['81', '/', '9', '9'], '', '', []),
      new DMAAN(['48', '/', '4', '12'], '', '', []),
      new DMAAN(['35', '/', '5', '7'], '', '', []),
      new DMAAN(['40', '/', '4', '10'], '', '', []),
      new DMAAN(['28', '/', '7', '4'], '', '', []),
      new DMAAN(['64', '/', '8', '8'], '', '', []),
      new DMAAN(['96', '/', '8', '12'], '', '', []),
      new DMAAN(['50', '/', '5', '10'], '', '', []),
      new DMAAN(['11', '/', '1', '11'], '', '', []),
      new DMAAN(['10', '/', '5', '2'], '', '', []),
      new DMAAN(['18', '/', '9', '2'], '', '', []),
      new DMAAN(['88', '/', '8', '11'], '', '', []),
      new DMAAN(['132', '/', '12', '11'], '', '', []),
      new DMAAN(['40', '/', '5', '8'], '', '', []),
    ];

    this.figGeometrica = [
      new DMAAN ([],'01', '20', ['01'] ),
      new DMAAN ([],'02', '2', ['09' ,'17'] ),
      new DMAAN ([],'03', '3', ['09' ,'17'] ),
      new DMAAN ([],'04', '1', ['20'] ),
      new DMAAN ([],'05', '1', ['09'] ),
      new DMAAN ([],'06', '12', ['05'] ),
      new DMAAN ([],'07', '8', ['07' ,'03'] ),
      new DMAAN ([],'08', '7', ['05' ,'03'] ),
      new DMAAN ([],'09', '8', ['01'] ),
      new DMAAN ([],'10', '5', ['01' ,'17'] ),
      new DMAAN ([],'11', '6', ['03' ,'17'] ),
      new DMAAN ([],'12', '6', ['03'] ),
      new DMAAN ([],'13', '7', ['07' ,'01'] ),
      new DMAAN ([],'14', '5', ['03' ,'01'] ),

    ];
  }
  ngonInit() {
    //on Init
  }

  getOperaciones() {
    return this.operaciones;
  }

  getFigGeometrica() {
    return this.figGeometrica;
  }
}
