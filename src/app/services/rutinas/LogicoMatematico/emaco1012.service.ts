import { Injectable } from '@angular/core';
import { EMACO } from "src/app/Models/rutinas/LogicoMatematico/Comprension/emaco.model";

@Injectable({
  providedIn: 'root'
})
export class Emaco1012Service {

  public operaciones : Array<EMACO>;
  public figIrregulares : Array<EMACO>;


  constructor(){
    this.operaciones=[
      new EMACO ('2+1', '3','',''),
      new EMACO ('2+2', '4','',''),
      new EMACO ('9-1', '8','',''),
      new EMACO ('9-5', '4','',''),
      new EMACO ('3 x 3', '9','',''),
      new EMACO ('2 x 2', '4','',''),
      new EMACO ('9 / 3', '3','','')
    ];

    this.figIrregulares=[
      new EMACO('', '', '01', '3'),
      new EMACO('', '', '03', '10'),
      new EMACO('', '', '04', '6'),
      new EMACO('', '', '05', '4'),
      new EMACO('', '', '06', '5'),
      new EMACO('', '', '07', '4'),
      new EMACO('', '', '08', '5'),
      new EMACO('', '', '09', '4'),
      new EMACO('', '', '10', '4'),
      new EMACO('', '', '11', '6'),
      new EMACO('', '', '12', '6'),
      new EMACO('', '', '13', '8'),
      new EMACO('', '', '14', '5'),
      new EMACO('', '', '15', '4'),
      new EMACO('', '', '16', '6'),
      new EMACO('', '', '17', '6'),
      new EMACO('', '', '18', '5'),
      new EMACO('', '', '19', '6'),
      new EMACO('', '', '20', '6'),
      new EMACO('', '', '21', '7'),
      new EMACO('', '', '22', '8'),
      new EMACO('', '', '23', '8'),
      new EMACO('', '', '24', '7'),
      new EMACO('', '', '25', '7'),
      new EMACO('', '', '26', '11'),
      new EMACO('', '', '27', '8'),
      new EMACO('', '', '28', '8'),
      new EMACO('', '', '29', '5'),
      new EMACO('', '', '30', '8'),

    ]

  }
  ngonInit(){
    //on Init
  }

  getOperaciones(){
    return this.operaciones;
  }

  getFigIrregulares(){
    return this.figIrregulares;
  }

}
